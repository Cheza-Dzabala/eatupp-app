import React from 'react';
import LineIcon from 'react-lineicons';

function PageHeader({ title, icon, actionText, action }) {
	return (
		<div className="admin-page-header">
			<h1 className="admin-page-title">{title}</h1>
			<div className="admin-page-actions">
				<div className="action" onClick={action}>
					<LineIcon name={icon} /> {actionText}
				</div>
			</div>
		</div>
	);
}

export default PageHeader;
