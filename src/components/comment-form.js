import { useDispatch } from '@wordpress/data';
import { useState, forwardRef, useContext } from '@wordpress/element';
import { store as coreDataStore, useEntityRecords, useEntityRecord, saveEntityRecord } from '@wordpress/core-data';
import {
	Card,
	CardBody,
	Popover,
	Icon,
	Button,
	TextareaControl,
} from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';

import { UserContext } from './inbox-screen';

const CommentForm = forwardRef(({replyParentId, setReplyParentId}, commentRef) => {
	const [ newComment, setNewComment ] = useState('');
	const { postView } = useContext(UserContext);
	const { record: replyTo, hasResolved: commentLoaded } = useEntityRecord('root', 'comment', replyParentId)

	const { saveEntityRecord } = useDispatch( coreDataStore );

	const handleCommentForm = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleCommentSave();
		}
	}

	const handlePopUpClose = () => {
		setReplyParentId(null);
	}

	const handleCommentSave = async () => {
		console.log('newComment:', newComment)
		if (newComment) {
			const success = await saveEntityRecord('root', 'comment', {
					post: postView,
					content: newComment,
					parent: replyParentId
				} )
			if (!success) {
				//TODO we should do some error handling
				console.log( success );
			}
			setNewComment('')
		}
	};
	return (
		<Card style={{width: '100%'}}>
			{commentLoaded && replyTo &&
				<Popover variant='toolbar' position='top center' onClose={() => handlePopUpClose()}>
					<Button onClick={() => handlePopUpClose()} >
						<Icon icon={closeSmall} />
					</Button>
					<CardBody dangerouslySetInnerHTML={{ __html: replyTo?.content.rendered }} />
				</Popover>
			}
			<form>
				<TextareaControl
					placeholder="Enter some text"
					value={ newComment }
					onChange={ (value) => setNewComment( value ) }
					onKeyDown={ (event) => handleCommentForm( event ) }
					className='reply-field'
					ref={commentRef}
				/>
			</form>
		</Card>
	);
});
export default CommentForm;
