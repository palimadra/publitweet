function Tweet(json) {
	var instance = this;
	
	this.id,this.screen_name,this.name,this.avatar,this.content,this.image,this.time_since,this.links;
	
	this.jNodes = new Array();
	
	this.last_request;
	
	this.id				= json.id;
	this.screen_name	= json.screen_name;
	this.avatar			= json.avatar;
	this.content 		= json.content;
	this.raw_content 	= json.raw_content;
	this.time_since		= json.time_since;
	this.image			= json.image;
	this.favorited		= json.favorited;
		
	this.feedtype		= 'slideshow';	
	
	this.favorite = function()
	{
		
	}
	
	this.setBehaviour = function(jNode)
	{
		//debug("setting behaviour for "+jNode.find('a.favorite').attr('href'));
		jNode.find("a[action='favorite']").click(function(e) {
			e.preventDefault();
			instance.event_favorite($(this));
			return false;
		});					
		jNode.find("a[action='del']").click(function(e) {
			e.preventDefault();
			c = confirm('Are you sure you wanna delete this picture? (cannot be undone)');
			if(c)
				instance.event_del($(this));
			return false;
		});			
		
		jNode.find('a.lightbox').lightBox({
			overlayBgColor: '#000',
			overlayOpacity: 0.6,
			imageLoading: '/public/img/lightbox-ico-loading.gif',
			imageBtnClose: '/public/img/lightbox-btn-close.gif',
			containerResizeSpeed: 350,
			txtImage: 'coucou',
			keyToClose:'escape',
			txtOf: 'from'
		   });

	}
	
	this.event_del = function(jNode)
	{
		request = BASE_URL+jNode.attr('href');
		
		id = jNode.attr('tweet_id');
		
		if(!this.valid_request())
			return false;

		$.ajax({
			type	: 'POST',
			url		: request,
			data	: {'id':id},
			dataType: 'json',
			success	: function(json) { 
						instance.callback_del(json); return false; 
		 		}
		});
	
	}

	this.callback_del = function(json)
	{
		this.disappear();
	}
	
	this.disappear = function()
	{
		for(var i = 0 ; i < this.jNodes.length ; i++)
		{
			this.jNodes[i].fadeOut(500, function() { $(this).remove(); });
	
		}
	}
	
	this.valid_request = function()
	{
		d = new Date();
		
		if(d.getTime()-this.last_request<=MIN_TIME_BETWEEN_AJAX_REQUESTS)
		{
			debug("Too much requests, skipping");
			return false;
		}
		this.last_request = d.getTime();
		return true;
	}
	
	this.event_favorite = function(jNode)
	{
		request = BASE_URL+jNode.attr('href');
		id = jNode.attr('tweet_id');

		if(!this.valid_request())
			return false;
		
		debug(request);
		
		$.ajax({
				type	: 'GET',
				url		: request,
				data	: {'id':id},
				dataType: 'json',
				async	: false,
				success	: function(json) { 
							instance.callback_favorite(json); return false; 
						 }
			});
		
		//$.getJSON(request,'',callback_favorite);
		return false;
	}
	
	this.callback_favorite = function(json)
	{
		$('#favorite_'+json.id).toggleClass('favorited');
		if(json.action=='add_tag')
		{
			opposite_action = 'del_tag';
		}
		else
		{
			opposite_action = 'add_tag';
		}		
		$('#tweet_'+json.id).find("a[action='favorite']").attr('href','tweet/'+opposite_action+'/'+json.id+'/favorite');

		debug('result: %o',json);
		return false;
	}
	
	this.toHTML = function(anchor)
	{
		if(this.favorited)
			action = 'del_tag';
		else
			action = 'add_tag';

		slideshow = "<div class='vignette' id='tweet_"+this.id+"'>" +
				"<div class='actions'>" +
				"<div class='left_actions'>" +
				"<a class='favorite "+this.favorited+"' tweet_id='"+this.id+"' id='favorite_"+this.id+"' href='tweet/"+action+"/"+this.id+"/favorite' action='favorite'>"+
				"</a>"+
				"</div>"+
				"<div class='right_actions'>" +
				"<a class='del' tweet_id='"+this.id+"' id='delete_"+this.id+"' href='tweet/del/"+this.id+"' action='del'>"+
				"</a>"+
				"</div>"+
				"</div>"+
				"<span class='image'>"+
				"<a title='"+this.screen_name + ': ' + escape(this.raw_content) + "' href='"+BASE_URL+"public/image.php?image="+this.image+"&width=500&height=350' class='lightbox'><img src='"+BASE_URL+"public/image.php?image="+this.image+"&width=150&height=150&cropratio=1:1' /></a>"+
				"</span>"+
				"<div class='tweet'>"+
				"<img src='"+this.avatar+"' class='avatar' />"+
				"<span class='screen_name'><a href='http://twitter.com/"+this.screen_name+"' target='_new'>"+this.screen_name+"</a></span>"+
				"<p class='content'>"+this.content+"</p>"+
				"<span class='metadata'>"+this.time_since+"</span>"+
				"</div>"+
				"</div>"
				;
				
		newsfeed = "<div class='newsfeed_tweet' id='tweet_"+this.id+"'>" +
				"<div class='tweet'>"+
				"<img src='"+this.avatar+"' class='avatar' />"+
				"<span class='screen_name'><a href='http://twitter.com/"+this.screen_name+"' target='_new'>"+this.screen_name+"</a></span>"+
				"<p class='content'>"+this.content+"</p>"+
				"<span class='metadata'>"+this.time_since+"</span>"+
				"</div>"+
				"<div class='actions'>" +
				"<div class='left_actions'>" +
				"<a class='favorite "+this.favorited+"' tweet_id='"+this.id+"' id='favorite_"+this.id+"' href='tweet/"+action+"/"+this.id+"/favorite' action='favorite'>"+
				"</a>"+
				"</div>"+
				"<div class='right_actions'>" +
				"<a class='del' tweet_id='"+this.id+"' id='delete_"+this.id+"' href='tweet/del/"+this.id+"' action='del'>"+
				"</a>"+
				"</div>"+
				"</div>"+
				"</div>"
				;	
				
		if(this.feedtype == 'slideshow')
			html = slideshow;
		else
			html = newsfeed;
			
		jNode = $(html);
		jNode.appendTo(anchor);
		this.setBehaviour(jNode);
		this.jNodes.push(jNode);
	}
	
	this.remove = function()
	{
		for(var i=0 ; i < this.jNodes.length ; i ++ )
			this.jNodes[i].remove();
	}
	
}