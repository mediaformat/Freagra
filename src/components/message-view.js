import { useEntityRecord, useEntityRecords } from "@wordpress/core-data";
import { UserContext } from "./inbox-screen";
import { useContext, useState, useRef } from "@wordpress/element";
import {
	Card,
	CardBody,
	CardMedia,
	Spinner,
	__experimentalText as Text,
} from "@wordpress/components";
import MessageCard from "./message-card";
import CommentForm from "./comment-form";
import {getBlockTypes, getBlockType } from '@wordpress/blocks';
import SSRComments from '@wordpress/server-side-render';

export const CoreCommentsBlock = () => {
	const { postView: post_id } = useContext(UserContext);
	const coreComments = getBlockType('core/comments');
};

const MessageView = () => {
	//TODO
	// card postview : title / featured image / link
	const { postView: post_id } = useContext(UserContext);

	const { record: post, hasResolved: postLoaded } = useEntityRecord('postType', 'post', post_id)

	const [ replyParentId, setReplyParentId ] = useState(null);

	let commentRef = useRef();
	console.log('PostView: replyParentId:', replyParentId)

	const commentsQuery = {
		post: post_id,
		// orderby : 'date',
		order : 'asc',
	}
	const {records: comments, hasResolved: commentsLoaded} = useEntityRecords('root', 'comment', commentsQuery)

	const {record: media, hasResolved: mediaLoaded} = useEntityRecord('root', 'media', post?.featured_media)

	if (!post) {
		return (
			<Card>
				<CardBody>
					<Text>placeholder</Text>
				</CardBody>
			</Card>
		)
	}
	if ( !postLoaded && !mediaLoaded) {
		return (
			<Spinner />
		);
	}

	return (
		<Card>
			<Card style={{margin: '0 auto', maxWidth: '350px'}}>
				<CardBody>
					{media &&
						<CardMedia>
							<img src={media.source_url} alt={media.alt_text} />
						</CardMedia>
					}
					<div dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
				</CardBody>
			</Card>
			{ !commentsLoaded &&
				<Spinner />
			}
			{ comments &&
				comments.map( comment => (
					<MessageCard comment={comment} key={comment.id} setReplyParentId={setReplyParentId} commentRef={commentRef} />
				) )
			}
			<CommentForm replyParentId={replyParentId} setReplyParentId={setReplyParentId} ref={commentRef} />
		</Card>
	)
}
export default MessageView;
