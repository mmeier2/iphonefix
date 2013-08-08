(function (window, document, $) {
	//create a modal popup with a body loaded from the provided url.
	//returns false if a modal is already open.
	$.modalPopup = function (url) {
		var $body = $('body')
		  , $popup = $('<div class="modal hide fade" >').appendTo($body);

		if (!$body.hasClass('modal-open')) {
			$popup.load(url, function (e) {
				$popup.modal('show').on('hidden', function (e) {
					$popup.remove();
				});
				$popup.modal('show').on('shown', function (e) {
					$('#OnTimeUrl').focus();
				});
				$popup.find('input:first').focus();
				$.validator.unobtrusive.parse('#modalPopup');
			});
			$popup.on('submit', function () {
				$(this).find(':submit').button('loading');
			});
			return $popup;
		}
		return false;
	};
}(window, document, jQuery));