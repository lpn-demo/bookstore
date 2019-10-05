import React from 'react';
import { urlBuilder } from '~/routes';
import { withTranslation } from 'react-i18next';

function Pagination (props) {

	let flag = ((props.pages !== undefined) && (props.currentPage !== undefined && props.totalPages > 1 ));

	return (
		<div >
			{flag &&
			<div className="card text-center m-3">
				<div className="card-footer pb-0 pt-3">
					
						<ul className="pagination justify-content-center" >
							<li className={`page-item first-item ${props.currentPage === 1 ? 'disabled' : ''}`}>
								<props.linkComponent to={urlBuilder('home', { id: 1 })} className="page-link">{props.t('first')}</props.linkComponent>
							</li>
							<li className={`page-item previous-item ${props.currentPage === 1 ? 'disabled' : ''}`}>
								<props.linkComponent to={urlBuilder('home', { id: props.currentPage - 1 })} className="page-link">{props.t('previous')}</props.linkComponent>
							</li>
							{props.pages.map(page =>
								<li key={page} className={`page-item number-item ${props.currentPage === page ? 'active' : ''}`}>
									<props.linkComponent to={urlBuilder('home', { id: page })} className="page-link">{page}</props.linkComponent>
								</li>
							)}
							<li className={`page-item next-item ${props.currentPage === props.totalPages ? 'disabled' : ''}`}>
								<props.linkComponent to={urlBuilder('home', { id: 2 })} className="page-link">{props.t('next')}</props.linkComponent>
							</li>
							<li className={`page-item last-item ${props.currentPage === props.totalPages ? 'disabled' : ''}`}>
								<props.linkComponent to={urlBuilder('home', { id: props.totalPages })} className="page-link">{props.t('last')}</props.linkComponent>
							</li>
						</ul>
					
				</div>
			</div>
			}
		</div>
	);
}

export default withTranslation()(Pagination);