/**
 * This Javascript class create a new editable list of twitterers
 * 
 * @return
 */
function ObjList(anchor) {
	var instance = this;
	
	this.anchor = anchor;
	this.form_anchor = '#form_add_twitterers';
	this.json;
	
	this.counter = 0;
	
	this.method = 'post';
	
	this.controller = 'twitterer';
	this.channel_id = 0;
	
	d = new Date();
	this.last_request = d.getTime();
	
	this.request = function(controller,action,data)
	{
		request = SITE_URL+controller+'/'+action;
		
		if(action=="add")
			callback = function(json) { instance.callback_add(json); };
		else if(action=="del")
			callback = function(json) { instance.callback_del(json); };
		else
		{
			debug('Error: no callback defined for this action: '+action);
			return false;
		}
			
		errorfn = function(XMLHttpRequest, textStatus, errorThrown) { instance.reset_form(); };
		
		//debug("Executing " + request +" with data "+data);
		
		d = new Date();
		if(d.getTime()-this.last_request < MIN_TIME_BETWEEN_AJAX_REQUESTS)
			return false;
		else
			this.last_request = d.getTime()
			
		//debug('request:'+request);
		
		if(this.method=='post')
		{
			$.ajax({
				type	: 'POST',
				url		: request,
				dataType: 'json',
				data	: data,
				async	: false,
				timeout : 3000,
				error	: errorfn,
				success	: callback
			});
		}
		else
			$.getJSON(request,data,callback);
			
	}
	
	this.callback_add = function(json)
	{
		if(!json)
		{
			debug('json is undefined');
			return false;
		}
		notice('#notice',json.notice);
		
		if(json.error)
		{
			debug('an error occured');
			this.reset_form();
			return false;			
		}
		
		node = this.makeNode(json);
		node.hide();
		
		debug('resetting form');
		this.reset_form();

		$(this.anchor).prepend(node);
		node.slideDown('slow');
		
		this.updateCounter(+1);
		this.behaviour();
	}
	
	this.reset_form = function()
	{
		debug('Fading out '+$(this.form_anchor + ' .wait').attr('class'));
		$(this.form_anchor + ' .wait').fadeOut('fast',function() {
			$(instance.form_anchor + ' .submit').fadeIn('fast');
			debug('form is reset');
		});
	}
	
	this.callback_del = function(json)
	{
		notice('#notice',json.notice);

		if(notice.error)
			return false;
		
		screen_name = json.screen_name;
		//debug(screen_name+' removed');
		node = $(this.anchor).find("[screen_name='"+screen_name+"']");

		node.fadeOut(500, function() { $(this).remove(); });
		
		this.updateCounter(-1);
	}
	
	this.callback_load = function(json)
	{
		this.json = json;
		this.scaffold();
		this.updateCounter(+this.json.length);
	}
	
	this.load = function(json)
	{
		instance.callback_load(json);
		/*
		$.get(request,function(json) {
			instance.callback_load(string2json(json));
		});
		*/
	}
	
	this.scaffold = function()
	{
		if(!this.json)
		{
			//console.error('No json loaded');
			return false;
		}
		
		//this.makeForm();
		this.formBehaviour();
		this.makeList();
		this.behaviour();
	}
	
	this.updateCounter = function(val) 
	{
		this.counter += val;
		pnotice('#pnotice',this.counter + ' Twitter users in your channel');
	}
	
	this.makeForm = function()
	{
		form = "<form action='add' controller='"+this.controller+"'>" +
				"<input type='hidden' name='channel_id' value='"+this.channel_id+"'>" +
				"<input type='text' name='screen_name'>" +
				"<input type='submit' value='add' class='submit'>" +
				"<div id='form_add_wait' class='wait'> </div>" +
				"</form>"
				;
		
		$(this.form_anchor).html($(form));
	}
	
	this.behaviour = function()
	{
		// Removing a twitterer
		$(this.anchor+' .del').click(function(e) {
			e.preventDefault();

			$(this).hide();
			$(this).siblings('.wait').show();

			screen_name = $(this).parents('div.twitterer').attr('screen_name');
			controller = instance.controller;
			action = $(this).attr("action");
			
			data = {"screen_name":screen_name,"channel_id":instance.channel_id};
			
			//debug("Catching event "+action+ ' with data '+data);
			instance.request(controller,action,data);
		});
		
		$('a.iframe').fancybox({
			'frameWidth' : 300
			});
		
	}
	
	this.formBehaviour = function()
	{
		$(this.form_anchor+' form').submit(function(e) {
			e.preventDefault();
			form = $(this);
			$(instance.form_anchor + ' .submit').fadeOut('fast',function() {
				$(instance.form_anchor + ' .wait').fadeIn('fast',function() {
					// In case something goes wrong, we make sure the form is reset
					//setTimeout('instance.reset_form()',1000);

					controller 	= instance.controller;
					action 		= form.attr('action');
					data		= form.serialize();
					form.find("[name='screen_name']").val('');
					//debug("Catching event "+action+ ' with data '+data);
					instance.request(controller,action,data);
				});
			});
		});
		
	}
	
	this.makeList = function()
	{
		//debug("Json length: "+this.json.length);
		for(var i=0;i<this.json.length;i++)
		{
			data = new Array();
			if(this.json[i].screen_name!='')
			{
				data = this.json[i];
				node = this.makeNode(data);
				$(this.anchor).append(node);
			}
		}	
	}
	
	this.makeNode = function(data)
	{
		if(data.name)
			name = data.name;
		else
			name = data.screen_name;
		
		node = $("<li><div class='twitterer' screen_name='"+data.screen_name+"'>\n"+
				"<img src='"+data.avatar+"' />"+
				"<span class='name'><a href='/widgets/profile/realtime/"+this.channel_id+".html?screen_name="+data.screen_name+"' class='iframe' target='preview'>"+name + "</a></span>\n"+
				"<span class='actions'><a href='#' action='del' class='del'></a>" +
				"<div class='wait> </div>" +
				"</span>\n"+
				"</div></li>");
		return node;
	}
	
}
