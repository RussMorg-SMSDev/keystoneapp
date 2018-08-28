const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	locals.section = 'tickets';
	locals.data = {
		tickets: [],
	};

	view.on('init', function (next) {
		const q = keystone.list('Ticket').model.find();

		q.exec(function (err, results) {
			locals.data.tickets = results;
			next(err);
		});
	});

	view.render('tickets/ticketlist');
};
