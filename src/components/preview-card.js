import { useContext } from '@wordpress/element';
import { humanTimeDiff } from '@wordpress/date';
import {
	Card, CardBody, CardMedia,
	Button,
	__experimentalText as Text,
} from '@wordpress/components';

import { UserContext } from './inbox-screen';

const PreviewCard = function PreviewCard ({ comment }) {
	const { setPostView } = useContext(UserContext);

	const relateToNow = humanTimeDiff( comment.date );
	const commentExcerpt = comment.content.raw.substring(0, 36) + '...';

	const cardBodyStyle = {
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
		gridGap: '0.75rem',
		position: 'relative'
	};
	const cardMediaStyle = {
		maxWidth: '48px',
	}
	const avatarStyle = {
		borderRadius: '100%'
	}
	const dateStyle = {
		color: '#777',
		fontSize: '0.75rem',
		display: 'inline-block',
		width: '100%',
		textAlign: 'right'
	}
	const excerptButtonStyle = {
		// height: '50px'
		// position: 'absolute',
		// top: 0,
		// bottom: 0,
		// left: 0,
		// right: 0
	}
	const handlePostClick = () => {
		setPostView(comment.post);
	}
	return (
		<Card className='message-preview'>
			<CardBody style={cardBodyStyle}>
				<CardMedia style={cardMediaStyle}>
					<img src={comment.author_avatar_urls[48]} style={avatarStyle} />
				</CardMedia>
				<div style={{position: 'relative'}}>
					<div>{comment.author_name}</div>
					<div dangerouslySetInnerHTML={{ __html: commentExcerpt }} />
					<Button onClick={handlePostClick} style={excerptButtonStyle} className='view-message'>
						<Text style={dateStyle}>{relateToNow}</Text>
					</Button>
				</div>
			</CardBody>
		</Card>
	)
}
export default PreviewCard;
