/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. IE Check
3. Set Header
4. Init Search
5. Init Menu
6. Init Accordions
7. Init Tabs
8. Init Milestones
9. Init Loaders


******************************/

$(document).ready(function()
{
	"use strict";

	/*

	1. Vars and Inits

	*/

	var ctrl = new ScrollMagic.Controller();

	initAccordions();
	initTabs();
	initMilestones();
	initLoaders();

	/*

	6. Init Accordions

	*/

	function initAccordions()
	{
		if($('.accordion').length)
		{
			var accs = $('.accordion');

			accs.each(function()
			{
				var acc = $(this);

				if(acc.hasClass('active'))
				{
					var panel = $(acc.next());
					var panelH = panel.prop('scrollHeight') + "px";

					if(panel.css('max-height') == "0px")
					{
						panel.css('max-height', panel.prop('scrollHeight') + "px");
					}
					else
					{
						panel.css('max-height', "0px");
					}
				}

				acc.on('click', function()
				{
					if(acc.hasClass('active'))
					{
						acc.removeClass('active');
						var panel = $(acc.next());
						var panelH = panel.prop('scrollHeight') + "px";

						if(panel.css('max-height') == "0px")
						{
							panel.css('max-height', panel.prop('scrollHeight') + "px");
						}
						else
						{
							panel.css('max-height', "0px");
						}
					}
					else
					{
						acc.addClass('active');
						var panel = $(acc.next());
						var panelH = panel.prop('scrollHeight') + "px";

						if(panel.css('max-height') == "0px")
						{
							panel.css('max-height', panel.prop('scrollHeight') + "px");
						}
						else
						{
							panel.css('max-height', "0px");
						}
					}
				});
			});
		}
	}

	/*

	7. Init Tabs

	*/

	function initTabs()
	{
		if($('.tab').length)
		{
			$('.tab').on('click', function()
			{
				$('.tab').removeClass('active');
				$(this).addClass('active');
				var clickedIndex = $('.tab').index(this);

				var panels = $('.tab_panel');
				panels.removeClass('active');
				$(panels[clickedIndex]).addClass('active');
			});
		}
	}

	/*

	8. Initialize Milestones

	*/

	function initMilestones()
	{
		if($('.milestone_counter').length)
		{
			var milestoneItems = $('.milestone_counter');

	    	milestoneItems.each(function(i)
	    	{
	    		var ele = $(this);
	    		var endValue = ele.data('end-value');
	    		var eleValue = ele.text();

	    		/* Use data-sign-before and data-sign-after to add signs
	    		infront or behind the counter number (+, k, etc) */
	    		var signBefore = "";
	    		var signAfter = "";

	    		if(ele.attr('data-sign-before'))
	    		{
	    			signBefore = ele.attr('data-sign-before');
	    		}

	    		if(ele.attr('data-sign-after'))
	    		{
	    			signAfter = ele.attr('data-sign-after');
	    		}

	    		var milestoneScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var counter = {value:eleValue};
		    		var counterTween = TweenMax.to(counter, 4,
		    		{
		    			value: endValue,
		    			roundProps:"value",
						ease: Circ.easeOut,
						onUpdate:function()
						{
							document.getElementsByClassName('milestone_counter')[i].innerHTML = signBefore + counter.value + signAfter;
						}
		    		});
		    	})
			    .addTo(ctrl);
	    	});
		}
	}

	/*

	7. Init Loaders

	*/

	function initLoaders()
	{
		if($('.loader').length)
		{
			var loaders = $('.circle');

			loaders.each(function()
			{
				var loader = $(this);
				var endValue = $(loader).data('perc');

				var loaderScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		loader.circleProgress({
						startAngle: 4.66,
						thickness: 4,
						size: 185,
						emptyFill:"transparent",
						fill: {gradient:["#4867c0", "#329fec"]},
					}).on('circle-animation-progress', function(event, progress, stepValue)
						{
							$(this).find('strong').text(Math.round(stepValue * 100) + "%");
						});
		    	})
			    .addTo(ctrl);
			});
		}
	}

});
