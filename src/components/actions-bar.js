import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { store as coreDataStore, useEntityRecords, useEntityRecord, saveEntityRecord } from '@wordpress/core-data';
import { Panel, PanelBody,
	Card, CardBody, CardMedia,
	TextareaControl, Spinner, Button, ButtonGroup,
	Toolbar, ToolbarButton, ToolbarDropdownMenu, ToolbarGroup,
	__experimentalText as Text,
	DropdownMenu, MenuGroup, MenuItem
} from '@wordpress/components';
import { more, moreHorizontalMobile, edit, commentReplyLink, reusableBlock, lifesaver, starEmpty, starFilled, trash } from '@wordpress/icons';

const ActionsBar = ({comment_id, setReplyParentId, commentRef}) => {
	const { deleteEntityRecord } = useDispatch( coreDataStore );
	const [ hasLike, setHasLike ] = useState( false );
	const [ hasShare, setHasShare ] = useState( false );

	const actionsBarStyle = {
		display: 'flex',
		justifyContent: 'end'
	}

	const iconLike = hasLike ? starFilled : starEmpty;
	const iconShare = reusableBlock;

	const handleAction = (action) => {
		switch(action) {
			case 'reply':
				setReplyParentId(comment_id);
				commentRef.current.focus();
				break;
			case 'delete':
				handleCommentDelete(comment_id)
				break;
			case 'share':
				setHasShare(!hasShare);
				console.log( 'fakeAction:', action, comment_id, '... TODO' );
				break;
			case 'like':
				setHasLike(!hasLike);
				console.log( 'fakeAction:', action, comment_id, '... TODO' );
				break;
			default:
				console.log( 'handleAction:', action, comment_id, 'not yet implemented' );
		}
	};
	const handleCommentDelete = async (comment_id) => {
		console.log( 'handleCommentDelete: ', comment_id );
		const success = await deleteEntityRecord('root', 'comment', comment_id )
		if (!success) {
			//TODO we should do some error handling
			console.log( success );
		}
		// controller: if comment by me ? [edit] : [like, share]
	};

	return (
		<Toolbar label="Options" variant='unstyled' style={actionsBarStyle}>
			<ToolbarGroup>
				<ToolbarButton icon={ commentReplyLink } label="Reply" onClick={() => handleAction('reply')} />
				<ToolbarButton icon={ iconShare } className={hasShare && 'share active'} label="Share" onClick={() => handleAction('share')} />
				<ToolbarButton icon={ iconLike } className={hasLike && 'like active'} label="Like" onClick={() => handleAction('like')} />
			</ToolbarGroup>
			<ToolbarGroup
				icon={ moreHorizontalMobile }
				isCollapsed={true}
				title='More'
				controls={[
					{
						icon: lifesaver,
						title: 'Report',
						onClick: () => handleAction('report')
					},
					{
						icon: trash,
						title: 'Delete',
						onClick: () => handleAction('delete')
					},
				]}
			/>
		</Toolbar>
	)
}
export default ActionsBar;
