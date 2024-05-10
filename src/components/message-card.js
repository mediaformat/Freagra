
import { useState, createContext, useContext } from '@wordpress/element';
import {
	Flex, FlexItem,
	Card, CardBody, CardMedia,
	__experimentalText as Text,
} from '@wordpress/components';
import { humanTimeDiff } from '@wordpress/date';
import ActionsBar from './actions-bar';

const MessageCard = function MessageCard ({ comment, setReplyParentId, commentRef }) {

	const relateToNow = humanTimeDiff( comment.date );
	const commentText = comment.content.rendered;

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
		height: '50px'
		// position: 'absolute',
		// top: 0,
		// bottom: 0,
		// left: 0,
		// right: 0
	}

	return (
		<Card>
			<CardBody style={cardBodyStyle}>
				<CardMedia style={cardMediaStyle}>
					<img src={comment.author_avatar_urls[48]} style={avatarStyle} />
				</CardMedia>
				<div style={{position: 'relative'}}>
					<Flex>
						<FlexItem>{comment.author_name}</FlexItem>
						<FlexItem style={dateStyle}>
							<a href={comment.link} target='_blank'>
								<Text style={dateStyle}>{relateToNow}</Text>
							</a>
						</FlexItem>
					</Flex>
					<div dangerouslySetInnerHTML={{ __html: commentText }} />
					<ActionsBar comment_id={comment.id} setReplyParentId={setReplyParentId} commentRef={commentRef} style={excerptButtonStyle} />
				</div>
			</CardBody>
		</Card>
	)
}
export default MessageCard;
