$(document).ready(function(){

	function randomize(min,max){ //pick a random number between a range
    	return Math.floor(Math.random()*(max-min+1)+min);
	}

	function capitalize(str){ //capitalize the first letter in a string
		str = str.toLowerCase().replace(/^\b[a-z]/g, function(letter){
    		return letter.toUpperCase();
		});
		return str;
	}

	$("#submit").on("click", function(e){
		e.preventDefault();
		var lorem = "";
		var num_paragraphs = $("#num_paragraphs").val();
		var option = $('#ipsum-select').find(":selected").attr("value");
		var type = "txt/"+option+".txt";
		// define type of placeholder text

		$.ajax({url:type,success:function(result){
			var loremipsum = result.split(', ');
			var loremipsum_length = loremipsum.length;
			console.log(loremipsum.length);

			for(var i=0; i<num_paragraphs; i++){ //run loop for number of paragraphs
				lorem+="<p>";
				if(i==0){
					if(type == "txt/katherineipsum_fce.txt" || type == "txt/katherineipsum.txt"){
						lorem+="Soo like,";
					}
				}
				var num_sentences = randomize(3,5); //define number of sentences per paragraph

				for(var j=0; j<=num_sentences; j++){ //run loop for number of sentences
					var num_words = randomize(7,15); //define number of words per sentence

					for(var k=0; k<=num_words; k++){ //run loop for # of words
						var rand = randomize(0,loremipsum_length-1);
						var word = loremipsum[rand];

						if(k==0){
							lorem += " "+capitalize(word); //capitalize the first word in a sentence
						}
						else if(k==num_words){ //add a period at the end of a sentence
							if(Math.random()>0.7 && type=="txt/katherineipsum.txt"){
								lorem += ", right?"; //seek confirmation that you're listening
							}
							else{
								lorem += " "+word+".";
							}
						}
						else if(k==5 && Math.random()>0.5){ //randomly add in commas
							lorem += " "+word+",";
						}
						else{
							lorem += " "+word;
						}
					} //end words loop

				} //end sentences loop

				lorem += "</p>";
			} //end paragraph loop

			$('.container').fadeOut(250, function(){ //fade out container
				$(".load-wrap").css("height", "315px");
				$("#loader").addClass("vertical-align-load");
				$("#loader").fadeIn(250, function(){ //show loader
					$('#results').html(lorem);
					$('.line').show();
					$(this).delay(1500).fadeOut(250, function(){ //hide loader & show container
						$(".load-wrap").css("height", "0");
						$(".container").fadeIn(250);
					});
				});
			});
		}});
	});
});
