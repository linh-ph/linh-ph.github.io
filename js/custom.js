$(document).ready(function() {

	// Default settings
	$('input:hidden[name=gender]').val(3);
	$('input:hidden[name=quantity]').val(1);
	$('input:hidden[name=output]').val(1);
	
	// Typing effect
	$(".typed").typed({
		strings: ["Ngày Phụ Nữ Vệt Nam"],
		typeSpeed: 50,
		backDelay: 2500,
		loop: true,
		shuffle: false
	});
	
	// Radio gender overlay
	$("#radio-gender-overlay").jic({
		selection_mode:'overlay',
		images_path: 'assets/img/people/', 
		images:['gender1','gender2','gender3']
	});
	
	// Radio output overlay
	$("#radio-output-overlay").jic({
		selection_mode:'overlay',
		images_path: 'assets/img/render/', 
		images:['render1','render2']
	});
	
	// Name modal select all function
	$("#select-all").click(function() {
		$("#names").select();
		document.execCommand("copy");
	});
	
	// Gender selection
	$("#radio-gender-overlay").click(function() {
		var data = ($('input:radio[name=gender-radio]:checked').val());
		$('input:hidden[name=gender]').val(Number(data));
	});
	
	// Output selection
	$("#radio-output-overlay").click(function() {
		var data=($('input:radio[name=output-radio]:checked').val());
		$('input:hidden[name=output]').val(Number(data));
	});
	
	// Quantity slider function.
	// var slider = document.getElementById('quantity-slider');
	// noUiSlider.create(slider, {
	// 	start: [1],
	// 	step: 1,
	// 	connect: 'lower',
	// 	range: {
	// 		'min': 1,
	// 		'max': 500
	// 	},
	// 	format: wNumb({
	// 	   decimals: 0
	// 	}),
	// });
	// var rangeSliderValueElement = document.getElementById('quantity-amount');
	// slider.noUiSlider.on('update', function (values, handle) {
	// 	rangeSliderValueElement.innerHTML = values[handle];
	// 	$("input:hidden[name=quantity]").val(values[handle]);
	// });
	
	// App form function
	$("#app-form").on("submit", function(e) {
		var output = $('input:radio[name=output-radio]:checked').val();
		if (output == "1") {
			e.preventDefault();
			$(".loader").css("visibility", "visible");
			$.ajax({
				type: "POST",
				url: "ajax.php",
				data: $("#app-form").serialize(),
				success: function(data) {
					if (data.slice(0,6) == "error:") {
						$("#error-message").html("<span>" + data + "</span>");
						$("#error-message").fadeIn("slow").delay(3000).fadeOut("slow");
					}
					else {
						$("#names").text(data);
					}
					$(".loader").css("visibility", "hidden");
					$(".popupTrigger").trigger("click");
				}
			});
		}
	});
	
	// Remove blank lines from textarea - IE Edge bug
	/* $('#names').focusout(function () {
		var text = $('#names').val();
		text = text.replace(/(?:(?:\r\n|\r|\n)\s*){2}/gm, "");
		$(this).val(text);
     }); */
	
	// Delay function for testing
	function sleep(milliseconds) {
		const date = Date.now();
		let currentDate = null;
		do {
			currentDate = Date.now();
		} while (currentDate - date < milliseconds);
	}

});

window.onload = function() {
    const playButton = document.getElementById("playButton");
	const audio = document.getElementById("myAudio");
	console.log("load successfully!");

	playButton.addEventListener("click", function() {
		// Check if the audio is paused
		if (audio.paused) {
			// If paused, play the audio
			audio.play().then(() => {
				console.log("Audio played successfully!");
			}).catch((error) => {
				console.error("Error playing audio: ", error);
			});
		}
	});
};