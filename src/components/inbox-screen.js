import { useDispatch } from '@wordpress/data';
import { humanTimeDiff } from '@wordpress/date';
import { useState, createContext, useContext } from '@wordpress/element';
import { store as coreDataStore, useEntityRecords, useEntityRecord, saveEntityRecord } from '@wordpress/core-data';
import { Panel, PanelBody,
	Card, CardBody, CardMedia,
	TextareaControl, Spinner, Button,
	__experimentalText as Text,
} from '@wordpress/components';

export const UserContext = createContext(null);

const SocialInbox = () => {
	// Layout here
	const [ isRequesting, setIsRequesting ] = useState( false );
	const [ postView, setPostView ] = useState( false );

	const commentsQuery = {
		orderby : 'date',
		order : 'desc',
		per_page: 20
	}
	const data = useEntityRecords('root', 'comment', commentsQuery);

	const layoutStyle = {
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
		gridGap: '1rem'
	}

	if ( ! data.hasResolved ) {
		return (
			<Spinner />
		);
	}

	return (
		<div className="wrap">
			<Panel header="FediPress">
				<PanelBody>
					<div style={layoutStyle}>
						<UserContext.Provider value={{ postView, setPostView }}>
							<Nav hasResolved={ data.hasResolved } comments={ data.records }/>
							<PostView post_id={ postView } style={{margin: '0 auto', width: '100%'}}/>
						</UserContext.Provider>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}

const Nav = ( { comments } ) => {
	//TODO - needs accessibility + keyboard nav + infinite scroll?

	// Group comments by Post
	let filteredComments = comments.filter((a, i) => comments.findIndex((s) => a.post === s.post) === i)

	const navStyle = {
		maxWidth: '350px',
	};

	return (
		<div style={navStyle}>
			{ filteredComments?.map( comment => (
				<MessageCard comment={comment} key={comment.id} excerpt='true'/>
			) ) }
		</div>
    );
}

function MessageCard ({ comment, excerpt = false }) {
	const { setPostView } = useContext(UserContext);

	const relateToNow = humanTimeDiff( comment.date );
	const commentExcerpt = comment.content.raw.substring(0, 36) + '...';
	const commentText = excerpt ? commentExcerpt : comment.content.rendered

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
		<Card>
			<CardBody style={cardBodyStyle}>
				<CardMedia style={cardMediaStyle}>
					<img src={comment.author_avatar_urls[48]} style={avatarStyle} />
				</CardMedia>
				<div style={{position: 'relative'}}>
					<div>{comment.author_name}</div>
					<div dangerouslySetInnerHTML={{ __html: commentText }} />
					{excerpt ?
						<Button onClick={handlePostClick} style={excerptButtonStyle}><Text style={dateStyle}>{relateToNow}</Text></Button>
						:
						<a href={comment.link} target='_blank'><Text style={dateStyle}>{relateToNow}</Text></a>
					}
				</div>
			</CardBody>
		</Card>
	)
}

const PostView = ({post_id}) => {
	//TODO
	// card postview : title / featured image / link

	const {record: post, hasResolved: postLoaded} = useEntityRecord('postType', 'post', post_id)

	const commentsQuery = {
		post: post_id,
		orderby : 'date',
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
					<div  dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
				</CardBody>
			</Card>
			{ !commentsLoaded &&
				<Spinner />
			}
			{ comments &&
				comments.map( comment => (
					<MessageCard comment={comment} key={comment.id} />
				) )
			}
			<InteractionReply />
		</Card>
	)
}

function InteractionReply () {
	const [ newComment, setNewComment ] = useState('');
	const { postView } = useContext(UserContext);
	const { saveEntityRecord } = useDispatch( coreDataStore );

	const handleComment = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleCommentSave();
		}

	}
	const handleCommentSave = async () => {
		const success = await saveEntityRecord('root', 'comment', {
				post: postView,
				content: newComment
			} )
		// console.log( success );
		//TODO we should do some error handling
	};
	const handleSubmit = () => {
		console.log('handleSubmit')
	}
	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<TextareaControl
					placeholder="Enter some text"
					value={ newComment }
					onChange={ (value) => setNewComment( value ) }
					onKeyDown={ (event) => handleComment( event ) }
					className='reply-field'
				/>
			</form>
		</Card>
	);
}

export default SocialInbox;
