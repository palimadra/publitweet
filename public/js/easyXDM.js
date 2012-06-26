/*
 * easyXDM 
 * http://easyxdm.net/
 * Copyright(c) 2009, Øyvind Sean Kinsey, oyvind@kinsey.no.
 * 
 * MIT Licensed - http://easyxdm.net/license/mit.txt
 * 
 */
 /*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM: true, window, escape, unescape */

/** 
 * @class easyXDM
 * A javascript library providing cross-browser, cross-site messaging/method invocation.<br/>
 * easyXDM.Debug and the easyXDM.configuration namespace is only available in the debug version.
 * @version 1.5.3.32
 * @singleton
 */
easyXDM = {
    /**
     * The version of the library
     * @type {String}
     */
    version: "1.5.3.32",
    /**
     * Applies properties from the source object to the target object
     * @param {Object} target The target of the properties
     * @param {Object} source The source of the properties
     */
    apply: function(target, source){
        if (!source) {
            return;
        }
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    },
    /** 
     * @class easyXDM.Interface
     * Creates an interface that can be used to call methods implemented
     * on the remote end of the channel, and also to provide the implementation
     * of methods to be called from the remote end.
     * @constructor
     * @param {easyXDM.configuration.ChannelConfiguration} channelConfig The underlying channels configuration.
     * @param {easyXDM.configuration.InterfaceConfiguration} config The description of the interface to implement
     * @param {Function} onReady A method that should be called when the interface is ready
     * @namespace easyXDM
     */
    Interface: function(channelConfig, config, onReady){
        var _channel;
        var _callbackCounter = 0, _callbacks = {};
        
        /**
         * Creates a method that implements the given definition
         * @private
         * @param {easyXDM.configuration.Methods.Method} The method configuration
         * @param {String} name The name of the method
         */
        function _createMethod(definition, name){
            // Add the scope so that calling the methods will work as expected
            if (typeof definition.scope === "undefined") {
                definition.scope = window;
            }
            if (definition.isVoid) {
                // No need to register a callback
                return function(){
                    var params = Array.prototype.slice.call(arguments, 0);
                    // Send the method request
                    window.setTimeout(function(){
                        _channel.sendData({
                            name: name,
                            params: params
                        });
                    }, 0);
                };
            }
            else {
                // We need to extract and register the callback
                return function(){
                    _callbacks["" + (++_callbackCounter)] = arguments[arguments.length - 1];
                    var request = {
                        name: name,
                        id: (_callbackCounter),
                        params: Array.prototype.slice.call(arguments, 0, arguments.length - 1)
                    };
                    // Send the method request
                    window.setTimeout(function(){
                        _channel.sendData(request);
                    }, 0);
                };
            }
        }
        
        /**
         * Executes the exposed method
         * @private
         * @param {String} name The name of the method
         * @param {Number} id The callback id to use
         * @param {Function} method The exposed implementation
         * @param {Array} params The parameters supplied by the remote end
         */
        function _executeMethod(name, id, method, params){
            if (!method) {
                throw new Error("The method " + name + " is not implemented.");
            }
            if (method.isAsync) {
                // The method is async, we need to add a callback
                params.push(function(result){
                    // Send back the result
                    _channel.sendData({
                        id: id,
                        response: result
                    });
                });
                // Call local method
                method.method.apply(method.scope, params);
            }
            else {
                if (method.isVoid) {
                    // Call local method 
                    method.method.apply(method.scope, params);
                }
                else {
                    // Call local method and send back the response
                    _channel.sendData({
                        id: id,
                        response: method.method.apply(method.scope, params)
                    });
                }
            }
        }
        
        channelConfig.converter = JSON;
        
        /**
         * Handles incoming data.<br/>
         * This can be either a request a method invocation, the response to one.
         * @private
         * @param {Object} data The JSON data object
         * @param {String} origin The origin of the message
         */
        channelConfig.onData = function(data, origin){
            if (data.name) {
                // A method call from the remote end
                _executeMethod(data.name, data.id, config.local[data.name], data.params);
            }
            else {
                // A method response from the other end
                _callbacks[data.id](data.response);
                delete _callbacks[data.id];
            }
        };
        
        /**
         * Tries to destroy the underlying channel and to remove all traces of the interface.
         */
        this.destroy = function(){
            _channel.destroy();
            for (var x in this) {
                if (this.hasOwnProperty(x)) {
                    delete this[x];
                }
            }
        };
        
        if (config.remote) {
            // Implement the remote sides exposed methods
            for (var name in config.remote) {
                if (config.remote.hasOwnProperty(name)) {
                    this[name] = _createMethod(config.remote[name], name);
                }
            }
        }
        // Delay setting up the channel until the interface has been returned
        window.setTimeout(function(){
            _channel = new easyXDM.Channel(channelConfig, onReady);
        }, 5);
    },
    /**
     * @class easyXDM.Channel
     * A channel wrapping an underlying transport.
     * @constructor
     * @param {easyXDM.ChannelConfiguration} config The channels configuration
     * @param {Function} onReady A method that should be called when the channel is ready
     * @namespace easyXDM
     */
    Channel: function(config, onReady){
        if (!config.converter) {
            throw new Error("No converter present. You should use the easyXDM.transport classes directly.");
        }
        /**
         * Wraps the transports onMessage method using the supplied serializer to convert.
         * @param {Object} data
         * @private
         */
        config.onMessage = function(message, origin){
            this.onData(this.converter.parse(message), origin);
        };
        
        /**
         * The underlying transport used by this channel
         * @type easyXDM.transport.ITransport
         */
        this.transport = null;
        /**
         * Tries to destroy the underlying transport
         */
        this.destroy = function(){
            this.transport.destroy();
        };
        /**
         * Send data using the underlying transport
         * If a serializer is specified then this will be used to serialize the data first.
         * @param {Object} data the data to send
         */
        this.sendData = function(data){
            this.transport.postMessage(config.converter.stringify(data));
        };
        
        var that = this;
        
        // Delay setting up the transport until the Channel is returned
        window.setTimeout(function(){
            that.transport = new easyXDM.transport.BestAvailableTransport(config, onReady);
        }, 5);
    }
};

/** 
 * @class easyXDM.DomHelper
 * Contains methods for dealing with the DOM
 * @singleton
 */
easyXDM.DomHelper = {
    /**
     * Creates a frame and appends it to the DOM.
     * @param {String} url The url the frame should be set to
     * @param {String} name The id/name the frame should get
     * @param {DOMElement} container
     * @param {Function} onLoad A method that should be called with the frames contentWindow as argument when the frame is fully loaded.
     * @return The frames DOMElement
     * @type DOMElement
     */
    createFrame: function(url, container, onLoad){
        var frame;
        var framesets = document.getElementsByTagName("FRAMESET");
        if (!container && framesets && framesets.length > 0) {
            frame = document.createElement("FRAME");
            frame.src = url;
            if (onLoad) {
                this.addEventListener(frame, "load", function(){
                    onLoad(frame.contentWindow);
                });
            }
            framesets[0].appendChild(frame);
        }
        else {
            frame = document.createElement("IFRAME");
            frame.src = url;
            if (onLoad) {
                this.addEventListener(frame, "load", function(){
                    onLoad(frame.contentWindow);
                });
            }
            if (container) {
                container.appendChild(frame);
            }
            else {
                frame.style.position = "absolute";
                frame.style.left = "-2000px";
                document.body.appendChild(frame);
            }
        }
        return frame;
    },
    /**
     * Gives a consistent interface for adding eventhandlers
     * @param {Object} target The target to add the event to
     * @param {String} type The name of the event
     * @param {Function} listener The listener
     */
    addEventListener: function(target, type, listener, useCapture){
        // Uses memoizing to cache the implementation
        if (window.addEventListener) {
            /**
             * Set addEventListener to use the DOM level 2 addEventListener
             * https://developer.mozilla.org/en/DOM/element.addEventListener
             * @ignore
             * @param {Object} target
             * @param {String} type
             * @param {Function} listener
             */
            easyXDM.DomHelper.addEventListener = function(target, type, listener, useCapture){
                target.addEventListener(type, listener, useCapture);
            };
        }
        else {
            /**
             * Set addEventlistener to a wrapper around the IE spesific attachEvent
             * http://msdn.microsoft.com/en-us/library/ms536343%28VS.85%29.aspx
             * @ignore
             * @param {Object} object
             * @param {String} sEvent
             * @param {Function} fpNotify
             */
            easyXDM.DomHelper.addEventListener = function(object, sEvent, fpNotify){
                object.attachEvent("on" + sEvent, fpNotify);
            };
        }
        easyXDM.DomHelper.addEventListener(target, type, listener);
    },
    /**
     * Gives a consistent interface for adding eventhandlers
     * @param {Object} target The target to add the event to
     * @param {String} type The name of the event
     * @param {Function} listener The listener
     */
    removeEventListener: function(target, type, listener, useCapture){
        // Uses memoizing to cache the implementation
        var removeEventListener;
        if (window.removeEventListener) {
            /**
             * Set removeEventListener to use the DOM level 2 removeEventListener
             * https://developer.mozilla.org/en/DOM/element.removeEventListener
             * @ignore
             * @param {Object} target
             * @param {String} type
             * @param {Function} listener
             */
            removeEventListener = function(target, type, listener, useCapture){
                target.removeEventListener(type, listener, useCapture);
            };
        }
        else {
            /**
             * Set removeEventlistener to a wrapper around the IE spesific detachEvent
             * http://msdn.microsoft.com/en-us/library/ms536411%28VS.85%29.aspx
             * @ignore
             * @param {Object} object
             * @param {String} sEvent
             * @param {Function} fpNotify
             */
            removeEventListener = function(object, sEvent, fpNotify){
                object.detachEvent("on" + sEvent, fpNotify);
            };
        }
        removeEventListener(target, type, listener);
        easyXDM.DomHelper.removeEventListener = removeEventListener;
    },
    /**
     * Checks for the precense of the JSON object.
     * If it is not precent it will use the supplied path to load the JSON2 library.
     * This should be called in the documents head right after the easyXDM script tag.
     * http://json.org/json2.js
     * @param {String} path A valid path to json2.js
     */
    requiresJSON: function(path){
        if (typeof JSON == "undefined" || !JSON) {
            document.write('<script type="text/javascript" src="' + path + '"></script>');
        }
    }
};
easyXDM.transport = {
    /**
     * @class easyXDM.transport.BestAvailableTransport
     * @extends easyXDM.transport.ITransport
     * BestAvailableTransport is a transport class that uses the best transport available.
     * Currently it will select among PostMessageTransport and HashTransport.
     * @constructor
     * @param {easyXDM.transport.TransportConfiguration} config The transports configuration.
     * @param {Function} onReady A method that should be called when the transport is ready
     * @namespace easyXDM.transport
     */
    BestAvailableTransport: function(config, onReady){
        if (config.local) {
            config.channel = (config.channel) ? config.channel : "default";
        }
        else {
            var query = easyXDM.Url.Query();
            config.channel = query.channel;
            config.remote = query.endpoint;
        }
        var type = "HashTransport";
        if (window.postMessage) {
            type = "PostMessageTransport";
        }
        return new easyXDM.transport[type](config, onReady);
        
    },
    /**
     * @class easyXDM.transport.PostMessageTransport
     * @extends easyXDM.transport.ITransport
     * PostMessageTransport is a transport class that uses HTML5 postMessage for communication
     * <a href="http://msdn.microsoft.com/en-us/library/ms644944(VS.85).aspx">http://msdn.microsoft.com/en-us/library/ms644944(VS.85).aspx</a>
     * <a href="https://developer.mozilla.org/en/DOM/window.postMessage">https://developer.mozilla.org/en/DOM/window.postMessage</a>
     * @constructor
     * @param {easyXDM.transport.TransportConfiguration} config The transports configuration.
     * @param {Function} onReady A method that should be called when the transport is ready
     * @namespace easyXDM.transport
     */
    PostMessageTransport: function(config, onReady){
        if (!window.postMessage) {
            throw "This browser does not support window.postMessage";
        }
        var _callerWindow, _targetOrigin = easyXDM.Url.getLocation(config.remote), _window_onMessageImplementation;
        
        /**
         * Resolves the origin from the event object
         * @private
         * @param {Object} event The messageevent
         * @return {String} The scheme, host and port of the origin
         */
        function _getOrigin(event){
            if (event.origin) {
                // This is the HTML5 property
                return event.origin;
            }
            if (event.uri) {
                // From earlier implementations 
                return easyXDM.Url.getLocation(event.uri);
            }
            if (event.domain) {
                // This is the last option and will fail if the 
                // origin is not using the same schema as we are
                return location.protocol + "//" + event.domain;
            }
            throw "Unable to retrieve the origin of the event";
        }
        
        /**
         * Delays calling onReady until the class has been returned
         * @private
         */
        function _onReady(){
            if (onReady) {
                window.setTimeout(onReady, 5);
            }
        }
        
        /**
         * The main onMessage handler. This will pass on the event to the real implementation
         * @private
         * @param {Object} event The messageevent
         */
        function _window_onMessage(event){
            _window_onMessageImplementation(event);
        }
        easyXDM.DomHelper.addEventListener(window, "message", _window_onMessage);
        
        /**
         * This is the main implementation for the onMessage event.<br/>
         * It checks the validity of the origin and passes the message on if appropriate.
         * @private
         * @param {Object} event The messageevent
         */
        function _handleMessage(event){
            var origin = _getOrigin(event);
            if (origin == _targetOrigin && event.data.substring(0, config.channel.length + 1) == config.channel + " ") {
                config.onMessage(event.data.substring(config.channel.length + 1), origin);
            }
        }
        
        /**
         * Used by local to fire the onReady method.
         * After being notified by the remote, this method will replace the
         * onMessage handler with _handleMessage and fire onReady
         * @private
         * @param {Object} event The messageevent
         */
        function _waitForReady(event){
            if (event.data == config.channel + "-ready") {
                // We use memoization to avoid having to run this check each time
                _window_onMessageImplementation = _handleMessage;
                _onReady();
            }
        }
        /**
         * Destroy all that we can destroy :)
         */
        this.destroy = function(){
            easyXDM.DomHelper.removeEventListener(window, "message", _window_onMessage);
            if (config.local) {
                _callerWindow.parentNode.removeChild(_callerWindow);
                _callerWindow = null;
            }
        };
        
        
        /** 
         * Sends the message using the postMethod method available on the window object
         * @param {String} message The message to send
         */
        this.postMessage = (function(){
            // Set up the messaging differently dependin on being local or remote
            if (config.local) {
                _window_onMessageImplementation = _waitForReady;
                _callerWindow = easyXDM.DomHelper.createFrame(easyXDM.Url.appendQueryParameters(config.remote, {
                    endpoint: easyXDM.Url.resolveUrl(config.local),
                    channel: config.channel
                }), config.container);
                return function(message){
                    _callerWindow.contentWindow.postMessage(config.channel + " " + message, _targetOrigin);
                };
            }
            else {
                _window_onMessageImplementation = _handleMessage;
                window.parent.postMessage(config.channel + "-ready", _targetOrigin);
                _onReady();
                return function(message){
                    window.parent.postMessage(config.channel + " " + message, _targetOrigin);
                };
                
            }
        }());
    },
    
    /**
     * @class easyXDM.transport.HashTransport
     * @extends easyXDM.transport.ITransport
     * HashTransport is a transport class that uses the IFrame URL Technique for communication
     * <a href="http://msdn.microsoft.com/en-us/library/bb735305.aspx">http://msdn.microsoft.com/en-us/library/bb735305.aspx</a>
     * @constructor
     * @param {easyXDM.transport.TransportConfiguration} config The transports configuration.
     * @param {Function} onReady A method that should be called when the transport is ready
     * @namespace easyXDM.transport
     */
    HashTransport: function(config, onReady){
        var _timer, _pollInterval = config.interval || 300, _poll;
        var _lastMsg = "#" + config.channel, _msgNr = 0, _listenerWindow, _callerWindow;
        var _remoteUrl, _remoteOrigin = easyXDM.Url.getLocation(config.remote);
        if (config.local) {
            var parameters = {
                endpoint: easyXDM.Url.resolveUrl(config.local),
                channel: config.channel
            };
            _poll = (typeof config.container !== "undefined");
            if (_poll) {
                parameters.poll = 1;
            }
            _remoteUrl = easyXDM.Url.appendQueryParameters(config.remote, parameters);
        }
        else {
            _listenerWindow = window;
            _poll = (typeof easyXDM.Url.Query().poll !== "undefined");
            
            _remoteUrl = config.remote + "#" + config.channel;
        }
        /**
         * Checks location.hash for a new message and relays this to the receiver.
         * @private
         */
        function _checkForMessage(){
            try {
                if (_listenerWindow.location.hash && _listenerWindow.location.hash != _lastMsg) {
                    _lastMsg = _listenerWindow.location.hash;
                    config.onMessage(decodeURIComponent(_lastMsg.substring(_lastMsg.indexOf("_") + 1)), _remoteOrigin);
                }
            } 
            catch (ex) {
            }
        }
        
        /**
         * Calls the supplied onReady method<br/>
         *  We delay this so that the the call to createChannel or createTransport will have completed.
         * @private
         */
        function _onReady(){
            if (config.local) {
                _listenerWindow = easyXDM.transport.HashTransport.getWindow(config.channel);
            }
            if (_poll) {
                _timer = window.setInterval(function(){
                    _checkForMessage();
                }, _pollInterval);
            }
            else {
                easyXDM.DomHelper.addEventListener(_listenerWindow, "resize", _checkForMessage);
            }
            if (onReady) {
                window.setTimeout(onReady, 10);
            }
        }
        
        /** 
         * Sends a message by encoding and placing it in the hash part of _callerWindows url.
         * We include a message number so that identical messages will be read as separate messages.
         * @param {String} message The message to send
         */
        this.postMessage = function(message){
            _callerWindow.src = _remoteUrl + "#" + (_msgNr++) + "_" + encodeURIComponent(message);
            if (!_poll) {
                _callerWindow.width = _callerWindow.width > 75 ? 50 : 100;
            }
        };
        
        /**
         * Tries to clean up the DOM
         */
        this.destroy = function(){
            if (_poll) {
                window.clearInterval(_timer);
            }
            else {
                easyXDM.DomHelper.removeEventListener(_listenerWindow, "resize", _checkForMessage);
            }
            _callerWindow.parentNode.removeChild(_callerWindow);
            _callerWindow = null;
        };
        
        if (config.local) {
            // Register onReady callback in the library so that
            // it can be called when hash.html has loaded.
            easyXDM.transport.HashTransport.registerOnReady(config.channel, _onReady);
        }
        _callerWindow = easyXDM.DomHelper.createFrame(_remoteUrl, config.container, (config.local) ? null : _onReady);
    }
};

/**
 * Contains the callbacks used to notify local that the remote end is ready
 */
easyXDM.transport.HashTransport.callbacks = {};
/**
 * Contains the proxy windows used to read messages from remote when
 * using HashTransport.
 */
easyXDM.transport.HashTransport.windows = {};

/**
 * Register a callback that should be called when the remote end of a channel is ready
 * @param {String} channel
 * @param {Function} callback
 */
easyXDM.transport.HashTransport.registerOnReady = function(channel, callback){
    easyXDM.transport.HashTransport.callbacks[channel] = callback;
};

/**
 * Notify that a channel is ready and register a window to be used for reading messages
 * for on the channel.
 * @param {String} channel
 * @param {Window} contentWindow
 */
easyXDM.transport.HashTransport.channelReady = function(channel, contentWindow){
    easyXDM.transport.HashTransport.windows[channel] = contentWindow;
    var fn = easyXDM.transport.HashTransport.callbacks[channel];
    if (fn) {
        fn();
        delete easyXDM.transport.HashTransport.callbacks[channel];
    }
    
};

/**
 * Returns the window associated with a channel
 * @param {String} channel
 * @return {Window} The window
 */
easyXDM.transport.HashTransport.getWindow = function(channel){
    return easyXDM.transport.HashTransport.windows[channel];
};
/** 
 * @class easyXDM.Url
 * Contains methods for dealing with url's
 * @singleton
 */
easyXDM.Url = {
    /**
     * A hashtable that gives access to the documents query string
     * The hashtable is cached internally
     * @returns A hashtable populated with keys and values from the querystring
     * @type {Object}
     */
    Query: function(){
        if (this._query) {
            return this._query;
        }
        this._query = {};
        var pair, key, value, search = location.search.substring(1).split("&");
        for (var i = 0, len = search.length; i < len; i++) {
            pair = search[i];
            key = pair.substring(0, pair.indexOf("="));
            value = pair.substring(key.length + 1);
            this._query[key] = value;
        }
        return this._query;
    },
    /**
     * Get the domain name from a url
     * @param {String} url The url to extract the domain from
     * @returns The domain part of the url
     * @type {String}
     */
    getDomainName: function(url){
        var domain = url.substring(url.indexOf("//") + 2);
        domain = domain.substring(0, domain.indexOf("/"));
        var _indexOf = domain.indexOf(":");
        if (_indexOf != -1) {
            domain = domain.substring(0, _indexOf);
        }
        return domain;
    },
    /**
     * Returns  a string containing the schema, domain and if present the port
     * @param {String} url The url to extract the location from
     * @return {String} The location part of the url
     */
    getLocation: function(url){
        var indexOf = url.indexOf("//");
        var loc = url.substring(indexOf + 2);
        loc = loc.substring(0, loc.indexOf("/"));
        return url.substring(0, indexOf + 2) + loc;
    },
    /**
     * Resolves a path to a complete url
     * @param {String} url The path to resolve
     * @return {String} The resolved url
     */
    resolveUrl: function(url){
        // If the url is a valid url we do nothing
        if (url.match(/^(http||https):\/\//)) {
            return url;
        }
        // If the url is relative to the root  
        if (url.substring(0, 1) == "/") {
            return location.protocol + "//" + location.host + url;
        }
        // If the url is relative to the current directory
        return location.href.substring(0, location.href.lastIndexOf("/") + 1) + url;
    },
    /**
     * Appends the parameters to the given url.<br/>
     * The base url can contain existing query parameters.
     * @param {String} url The base url
     * @param {Object} parameters The parameters to add
     */
    appendQueryParameters: function(url, parameters){
        var q = "";
        for (var key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                q += key + "=" + parameters[key] + "&";
            }
        }
        return url + ((url.indexOf("?") == -1) ? "?" : "&") + q.substring(0, q.length - 1);
    }
};
easyXDM.serializing = {
    /**
     * @class easyXDM.serializing.hashTableSerializer
     * A serializer that can convert to and from hashtables
     * It uses the same format as the query string for its serialized data
     * @namespace easyXDM.serializing
     */
    hashTableSerializer: {
        /**
         * Serializes a hashtable and returns it as a string
         * @param {Object} data The data to serialize
         * @returns The serialized string
         * @type {String}
         */
        stringify: function(data){
            var message = "";
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    message += key + "=" + escape(data[key]) + "&";
                }
            }
            return message.substring(0, message.length - 1);
        },
        /**
         * Deserializes a string and returns a hashtable
         * @param {String} message The string to deserialize
         * @returns An hashtable populated with key-value pairs
         * @type {Object}
         */
        parse: function(message){
            var data = {};
            var d = message.split("&");
            var pair, key, value;
            for (var i = 0, len = d.length; i < len; i++) {
                pair = d[i];
                key = pair.substring(0, pair.indexOf("="));
                value = pair.substring(key.length + 1);
                data[key] = unescape(value);
            }
            return data;
        }
    }
};
