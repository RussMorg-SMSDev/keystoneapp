const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	//sets highlighted item in navigation
	locals.section = 'tickets';
	locals.data = {
		ticket: [],
	};

	//Loads ticket
	view.on('init', function (next) {
		const q = keystone.list('Ticket').model.findOne({ slug: locals.data.title });

		q.exec(function (err, result) {
			if (result != null) {
				locals.data.ticket = result;
			} else {
				return res.status(404).send(keystone.wrapHTMLError('Sorry, no ticket found! (404)'));
			}
			next(err);
		});
	});

	//Render view
	view.render('tickets/singleticket');
};
