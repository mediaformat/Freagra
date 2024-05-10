import { useEntityRecords } from '@wordpress/core-data';
import { Spinner, Card } from '@wordpress/components';
import PreviewCard from './preview-card';

const MessageNav = function MessageNav() {
	//TODO - needs accessibility + keyboard nav + infinite scroll?

	const navStyle = {
		// width: '350px',
		// width: '100%'
	};

	// get comments
	const commentsQuery = {
		orderby : 'date',
		order : 'desc',
		per_page: 20
	}

	const { hasResolved: commentsLoaded, records: comments } = useEntityRecords('root', 'comment', commentsQuery);

	if ( ! commentsLoaded ) {
		return (
			<Spinner />
		);
	}

	// Group comments by Post
	let filteredComments = comments.filter((a, i) => comments.findIndex((s) => a.post === s.post) === i)
	console.log(filteredComments)
	return (
		<Card className='messages-nav'>
			<ul style={navStyle}>
				{ filteredComments?.map( comment => (
					<li key={comment.id}>
						<PreviewCard comment={comment} />
					</li>
				) ) }
			</ul>
		</Card>
    );
}
export default MessageNav;
