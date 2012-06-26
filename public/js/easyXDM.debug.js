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
        easyXDM.Debug.trace("creating new interface");
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
                easyXDM.Debug.trace("creating void method " + name);
                // No need to register a callback
                return function(){
                    easyXDM.Debug.trace("executing void method " + name);
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
                easyXDM.Debug.trace("creating method " + name);
                // We need to extract and register the callback
                return function(){
                    easyXDM.Debug.trace("executing method " + name);
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
                easyXDM.Debug.trace("requested to execute async method " + name);
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
                    easyXDM.Debug.trace("requested to execute void method " + name);
                    // Call local method 
                    method.method.apply(method.scope, params);
                }
                else {
                    easyXDM.Debug.trace("requested to execute method " + name);
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
                easyXDM.Debug.trace("received request to execute method " + data.name + (data.id ? (" using callback id " + data.id) : ""));
                // A method call from the remote end
                _executeMethod(data.name, data.id, config.local[data.name], data.params);
            }
            else {
                easyXDM.Debug.trace("received return value destined to callback with id " + data.id);
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
            easyXDM.Debug.trace("creating concrete implementations");
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
        easyXDM.Debug.trace("easyXDM.Channel.constructor");
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
            easyXDM.Debug.trace("easyXDM.Channel.destroy");
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
 * @class easyXDM.Debug
 * Utilities for debugging. This class is only precent in the debug version.
 * @namespace easyXDM
 */
easyXDM.Debug = {
    /**
     * Logs the message to console.log if available
     * @param {String} msg The message to log
     */
    log: function(msg){
        // Uses memoizing to cache the implementation
        var log;
        if (typeof console === "undefined" || typeof console.log === "undefined") {
            /**
             * Sets log to be an empty function since we have no output available
             * @ignore
             */
            log = function(){
            };
        }
        else {
            /**
             * Sets log to be a wrapper around console.log
             * @ignore
             * @param {String} msg
             */
            log = function(msg){
                console.log(location.host + ":" + msg);
            };
        }
        log(msg);
        easyXDM.Debug.log = log;
    },
    /**
     * Will try to trace the given message either to a DOMElement with the id "log",
     * or by using console.info.
     * @param {String} msg The message to trace
     */
    trace: function(msg){
        // Uses memoizing to cache the implementation
        var trace;
        var el = document.getElementById("log");
        if (el) {
            /**
             * Sets trace to be a function that outputs the messages to the DOMElement with id "log"
             * @ignore
             * @param {String} msg
             */
            trace = function(msg){
                el.appendChild(document.createElement("div")).appendChild(document.createTextNode(location.host + "-" + new Date().valueOf() + ":" + msg));
                el.scrollTop = el.scrollHeight;
            };
        }
        else {
            if (typeof console === "undefined" || typeof console.info === "undefined") {
                /**
                 * Sets trace to be an empty function
                 * @ignore
                 */
                trace = function(){
                };
            }
            else {
                /**
                 * Sets trace to be a wrapper around console.info
                 * @ignore
                 * @param {String} msg
                 */
                trace = function(msg){
                    console.info(location.host + ":" + msg);
                };
            }
        }
        easyXDM.Debug.trace = trace;
        easyXDM.Debug.trace(msg);
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
        easyXDM.Debug.trace("creating frame pointing to " + url);
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
                easyXDM.Debug.trace("adding listener " + type);
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
                easyXDM.Debug.trace("adding listener " + sEvent);
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
            easyXDM.Debug.log("loading external JSON");
            document.write('<script type="text/javascript" src="' + path + '"></script>');
        }
        else {
            easyXDM.Debug.log("native JSON found");
        }
    }
};
easyXDM.transport = {
    /**
     * @class easyXDM.transport.ITransport
     * The interface implemented by all transport classes.<br/>
     * Only available in debug mode.
     * @namespace easyXDM.transport
     */
    ITransport: {
        /**
         * Sends the message
         * @param {String} message The message to send
         */
        postMessage: function(message){
        },
        /** 
         * Breaks down the connection and tries to clean up the dom.
         */
        destroy: function(){
        }
    },
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
        easyXDM.Debug.trace("easyXDM.transport.BestAvailableTransport.constructor");
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
        easyXDM.Debug.trace("easyXDM.transport.PostMessageTransport.constructor");
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
            easyXDM.Debug.trace("onMessage");
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
            easyXDM.Debug.trace("received message '" + event.data + "' from " + origin);
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
                easyXDM.Debug.trace("firing onReady");
                // We use memoization to avoid having to run this check each time
                _window_onMessageImplementation = _handleMessage;
                _onReady();
            }
            else {
                easyXDM.Debug.trace("received unexpected message: " + event.data + ", expected " + config.channel + "-ready");
            }
        }
        /**
         * Destroy all that we can destroy :)
         */
        this.destroy = function(){
            easyXDM.Debug.trace("destroying transport");
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
                    easyXDM.Debug.trace("sending message '" + message + "' to iframe " + _targetOrigin);
                    _callerWindow.contentWindow.postMessage(config.channel + " " + message, _targetOrigin);
                };
            }
            else {
                _window_onMessageImplementation = _handleMessage;
                easyXDM.Debug.trace("firing onReady");
                window.parent.postMessage(config.channel + "-ready", _targetOrigin);
                _onReady();
                return function(message){
                    easyXDM.Debug.trace("sending message '" + message + "' to parent " + _targetOrigin);
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
        easyXDM.Debug.trace("easyXDM.transport.HashTransport.constructor");
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
                easyXDM.Debug.trace("using polling");
            }
            _remoteUrl = easyXDM.Url.appendQueryParameters(config.remote, parameters);
        }
        else {
            _listenerWindow = window;
            _poll = (typeof easyXDM.Url.Query().poll !== "undefined");
            if (_poll) {
                easyXDM.Debug.trace("using polling");
            }
            
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
                    easyXDM.Debug.trace("received message '" + _lastMsg + "' from " + _remoteOrigin);
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
                easyXDM.Debug.trace("starting polling");
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
            easyXDM.Debug.trace("sending message '" + message + "' to " + _remoteOrigin);
            _callerWindow.src = _remoteUrl + "#" + (_msgNr++) + "_" + encodeURIComponent(message);
            if (!_poll) {
                _callerWindow.width = _callerWindow.width > 75 ? 50 : 100;
            }
        };
        
        /**
         * Tries to clean up the DOM
         */
        this.destroy = function(){
            easyXDM.Debug.trace("destroying transport");
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
    easyXDM.Debug.trace("registering onReady callback for channel " + channel);
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
    easyXDM.Debug.trace("executing onReady callback for channel " + channel);
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
easyXDM.configuration = {

    /**
     * @class easyXDM.configuration.TransportConfiguration
     * The configuration for transport classes.
     * @namespace easyXDM.configuration
     */
    TransportConfiguration: {
        /**
         * The url of the remote endpoint
         */
        remote: "",
        /**
         * The url of the local copy of hash.html
         */
        local: "",
        /**
         * The method that should handle incoming messages
         * @param {String} message The message
         * @param {String} origin The origin of the message
         */
        onMessage: function(message, origin){
        
        }
    },
    
    /**
     * @class easyXDM.configuration.ChannelConfiguration
     * The channels configuration
     * @extends easyXDM.configuration.TransportConfiguration
     * @namespace easyXDM.configuration
     */
    ChannelConfiguration: {
        /**
         * The serializer to use
         * @type easyXDM.serializing.ISerializer
         */
        converter: {}
    },
    /**
     * @class easyXDM.configuration.InterfaceConfiguration
     * The interface configuration
     * @namespace easyXDM.configuration
     */
    InterfaceConfiguration: {
        /**
         * The local property is of type {@link easyXDM.configuration.LocalConfiguration}
         * @link {easyXDM.configuration.LocalConfiguration}
         * @type easyXDM.configuration.LocalConfiguration
         */
        local: {},
        /**
         * The remote property contains a list of method-definitions in the form of methodname:{description}
         * @type easyXDM.configuration.RemoteConfiguration
         */
        remote: {}
    },
    /**
     * @class easyXDM.configuration.LocalConfiguration
     * The configuration for the local property
     * @namespace easyXDM.configuration
     */
    LocalConfiguration: {
        /**
         * A method returning data
         * @type easyXDM.configuration.Methods.LocalMethod
         */
        methodName: {},
        /**
         * A method not returning any data
         * @type easyXDM.configuration.Methods.LocalVoidMethod
         */
        voidMethodName: {},
        /**
         * An asynchronous method that is unable to return data immediately
         * This can for instance be a method using an xmlHttpRequest object to retrieve data
         * @type easyXDM.configuration.Methods.LocalAsyncMethod
         */
        asyncMethodName: {}
    },
    /**
     * @class easyXDM.configuration.RemoteConfiguration
     * The configuration for the remote property
     * @namespace easyXDM.configuration
     */
    RemoteConfiguration: {
        /**
         * Methods are by default expected to return data
         * @type easyXDM.configuration.Methods.RemoteMethod
         */
        methodName: {},
        /**
         * We do not expect any data back from this method
         * @type easyXDM.configuration.Methods.RemoteVoidMethod
         */
        voidMethodName: {},
        /**
         * We do not need to know that the remote method is implemented asynchronous
         * @type easyXDM.configuration.Methods.RemoteAsyncMethod
         */
        asyncMethodName: {}
    },
    /**
     * Contains description on the various method descriptions
     */
    Methods: {
        /**
         * @class easyXDM.configuration.Methods.Method
         * The base method implementation
         * @namespace easyXDM.configuration.Methods
         */
        Method: {},
        /**
         * @class easyXDM.configuration.Methods.LocalMethod
         * @extends easyXDM.configuration.Methods.Method
         * A method returning data
         * @namespace easyXDM.configuration.Methods
         */
        LocalMethod: {
            /**
             * The implementation
             * @param {Object} arg1
             * @param {Object} arg2
             * @param {Object} argN
             * @return The methods return value
             */
            method: function(arg1, arg2, argN){
            }
        },
        /**
         * @class easyXDM.configuration.Methods.LocalVoidMethod
         * @extends easyXDM.configuration.Methods.Method
         * A method not returning any data
         * @namespace easyXDM.configuration.Methods
         */
        LocalVoidMethod: {
            /**
             * If the method does not return anything then we mark it as void
             * @property
             */
            isVoid: true,
            /**
             * The implementation
             * @param {Object} arg1
             * @param {Object} arg2
             * @param {Object} argN
             */
            method: function(arg1, arg2, argN){
            }
        },
        /**
         * @class easyXDM.configuration.Methods.LocalAsyncMethod
         * @extends easyXDM.configuration.Methods.Method
         * An asynchronous method that is unable to return data immediately
         * This can for instance be a method using an xmlHttpRequest object to retrieve data
         * @namespace easyXDM.configuration.Methods
         */
        LocalAsyncMethod: {
            /**
             * If the method is asyncronous we mark it as async
             * This is so that the framework will know that it expects a callback function
             */
            isAsync: true,
            /**
             * The implementation
             * @param {Object} arg1
             * @param {Object} arg2
             * @param {Object} argN
             * @param {Function} callback
             */
            method: function(arg1, arg2, argN, callback){
            }
        },
        /**
         * @class easyXDM.configuration.Methods.RemoteMethod
         * Methods are by default expected to return data
         * @namespace easyXDM.configuration.Methods
         */
        RemoteMethod: {},
        /**
         * @class easyXDM.configuration.Methods.RemoteVoidMethod
         * @extends easyXDM.configuration.Methods.Method
         * We do not expect any data back from this method
         * @namespace easyXDM.configuration.Methods
         */
        RemoteVoidMethod: {
            /**
             * We mark the method as void so that the framework will not wait for any response, and will not expect a callback method
             */
            isVoid: true
        },
        /**
         * @class easyXDM.configuration.Methods.RemoteAsyncMethod
         * @extends easyXDM.configuration.Methods.Method
         * We do not need to know that the remote method is implemented asynchronous
         * @namespace easyXDM.configuration.Methods
         */
        RemoteAsyncMethod: {}
    }
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
     * @class easyXDM.serializing.ISerializer
     * The Interface implemented by all serializers.<br/>
     * Only available in debug mode.
     * @namespace easyXDM.serializing
     */
    ISerializer: {
        /**
         * Serializes an object and returns it as a string
         * @param {Object} data The data to serialize
         * @returns The serialized string
         * @type {String}
         */
        stringify: function(data){
        
        },
        /**
         * Deserializes a string and returns an object
         * @param {String} message The string to deserialize
         * @returns An object
         * @type {Object}
         */
        parse: function(message){
        
        }
    },
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
