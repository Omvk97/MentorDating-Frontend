import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import AdminPanelPage from '../admin_page/AdminPanel.page';
import CategoriesPage from '../categories_page/Categories.page';

function Home({ currentUser }) {
  if (!currentUser) return <CategoriesPage />; // all mentors
  return currentUser.role === 'admin' ? <AdminPanelPage /> : <CategoriesPage />;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Home);
