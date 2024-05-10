import { useState, createContext } from '@wordpress/element';
import { Panel, PanelBody } from '@wordpress/components';

import MessageNav from './message-nav';

import MessageView, { CoreCommentsBlock } from './message-view';

export const UserContext = createContext(null);
export const ActionContext = createContext(null);//?

const SocialInbox = () => {
	// Layout here
	const [ postView, setPostView ] = useState( false );

	const layoutStyle = {
		display: 'grid',
		gridTemplateColumns: '350px 1fr',
		gridGap: '1rem'
	}

	return (
		<div className="wrap">
			<Panel header="Freagra">
				<PanelBody>
					<div style={layoutStyle}>
						<UserContext.Provider value={{ postView, setPostView }}>
							<MessageNav/>
							<MessageView style={{margin: '0 auto', width: '100%'}}/>
							<CoreCommentsBlock />
						</UserContext.Provider>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}

export default SocialInbox;
