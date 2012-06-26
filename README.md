publitweet
==========

Better Twitter Widget using Embed.ly to automatically expand links

<pre>&lt;script src="publitweet.js"&gt;&lt;/script&gt;
&lt;script&gt;
new Publitweet({
feed : 'storify/team',
filters : {'keywords':'','blacklist':''},
title :&nbsp; 'Liste @storify/team',
description : 'Latest tweets',
headerBackground : '#E7EFF8',
borderColor : '#323232',
width : 500,
height : 600&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
}).show();&nbsp;&nbsp; &nbsp;
&lt;/script&gt;
</pre>
<h2>Options</h2>
<table border="0">
<tbody>
<tr>
<td>feed <br /></td>
<td>
<p>the twitter feed to display (could be a single user 'storify' or a twitter list 'storify/team')</p>
</td>
</tr>
<tr>
<td>filters <br /></td>
<td>
<p>you can filter the tweets that will be displayed in the widget by specifying keywords and blacklisted words.</p>
<p>E.g. {'keywords':'iphone or ipad','blacklist':'microsoft'} =&gt; only tweets containing iPhone or iPad (case insensitive) and which do not contain the word Microsoft will be displayed</p>
</td>
</tr>
<tr>
<td>title <br /></td>
<td>title of the widget (optional) <br /></td>
</tr>
<tr>
<td>description <br /></td>
<td>description of the widget (optional) <br /></td>
</tr>
<tr>
<td>headerBackground <br /></td>
<td>Color in HTML of the background of the header and footer of the widget <br /></td>
</tr>
<tr>
<td>borderColor <br /></td>
<td>
<p>Color in HTML of the borders of the widget (including tweets separator and tabs if displayed)</p>
</td>
</tr>
<tr>
<td>headerTextColor</td>
<td>
<p>Color in HTML of the header and footer text of the widget</p>
</td>
</tr>
<tr>
<td>
<p>width&nbsp;</p>
</td>
<td>Width in pixels of the widget (can be 100% to match the widget container's size) <br /></td>
</tr>
<tr>
<td>height <br /></td>
<td>
<p>Height in pixels of the widget (can be 'auto' to automatically adjust height based on the tweets displayed, useful if you don't want to have a vertical scrollbar)</p>
</td>
</tr>
<tr>
<td>limit</td>
<td>Integer between 1 and 200: number of tweets to display in the widget</td>
</tr>
<tr>
<td>language</td>
<td>default: 'en', could be 'fr' to have the widget in French</td>
</tr>
<tr>
<td>tabs</td>
<td>default: false, if true clicks on avatar and people's name will open the person's latest tweets in a tab within the widget. It is recommended to use this only if the widget fills the entire page (at least 450 pixels wide)</td>
</tr>
<tr>
<td>profilePage</td>
<td>You can specify a different URL to open when a user clicks on someone's avatar or name. By default it will open that person's profile on Twitter.com (default value: '<a href="http://twitter.com/">http://twitter.com/</a>' - $screen_name is automatically appended). This only works if the tabs argument is set to false.</td>
</tr>
<tr>
<td>morePage</td>
<td>You may want to have a small version of the widget in your sidebar or on your homepage which displays a very limited number of tweets and offer the possibility to click to see more on another page where the Publitweet widget has more room. To do that just specify the URL of the page. The footer of the widget will show a link "More tweets".</td>
</tr>
<tr>
<td>signature</td>
<td>default: '/via @publitweet'. The signature is appended to the tweets shared by the users only if the length of the original tweet plus the signature does not exceed 140 characters.</td>
</tr>
<tr>
<td>showUrlDescription</td>
<td>If the widget is very small, you may want not to display the full description of attached links. To do that, just set the value of showUrlDescription to false.</td>
</tr>
<tr>
<td><span style="color: #000000; font-family: arial, sans-serif;">showUrlMetadata</span><br /></td>
<td>If this is set to false, then none of the shortened links in the widget will be expanded.</td>
</tr>
</tbody>
</table>
<h2>Performance</h2>
<p>The Publitweet widget was designed for big publishers with millions of page requests. It is very efficient in terms of load.</p>
<p>For example, the javascript code is separated in two parts.&nbsp;One cached by the browser that never needs to be refreshed and another containing tweets that is continuously updated. The former is loaded with the page. As it is cached by the client it is not a problem for performance. The latter is loaded on demand when the widget starts loading so it doesn't penalize the loading time of your page. In fact, if the Publitweet widget never appears (for example if you put the widget at the bottom of your page and the user doesn't scroll down), it will never get loaded.</p>
