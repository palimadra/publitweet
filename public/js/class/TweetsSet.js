function TweetsSet(anchor) {
	var instance = this;
	
	this.size;
	this.tweets_array = new Array();
	this.mpp; // max per page
	this.page;
	
	this.anchor = anchor;
	this.channel_id;
	this.feedtype = 'slideshow';
	
	this.keyword = '';
	
	this.last_sync_id;
	
	this.loaded = false;
		
	this.update = function()
	{
		
	}
	
	this.load = function (request)
	{
		this.removeAll();
		$.getJSON(BASE_URL + request,'',function(json) { 
			instance.callback_reload(json);
			});
	}
	
	this.display_msg = function (msg)
	{
		html = '<div class="msg_overlay">'+msg+'</div>';
		$(this.anchor).append(html);
	}
	
	this.callback_reload = function(json)
	{
		if(json.length<1)
		{
			debug("No JSON received");
			this.display_msg("<p>There is no tweet yet.</p><p>New tweets are updated every minute. Please come back later</p>");
			return false;
		}
		for(var i = 0; i < json.length; i++)
		{
			this.addTweet(json[i]);
		}
		
		this.loaded = true;
		this.toHTML(this.anchor);
	}
	
	this.addTweet = function(tweet_array)
	{
		t = new Tweet(tweet_array);
		t.channel_id = this.channel_id;
		t.feedtype = this.feedtype;
		this.tweets_array.push(t);
	}
	
	this.toHTML = function(anchor)
	{
		for(var i=0;i<this.tweets_array.length;i++)
		{
			this.tweets_array[i].toHTML(anchor);
		}
	}
	
	this.removeAll = function()
	{
		for(var i=0;i<this.tweets_array.length;i++)
		{
			this.tweets_array[i].remove();
		}
		this.tweets_array = new Array();
	}

	
}