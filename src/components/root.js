import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MainPage from './routes/main-page/main-page';
import EditPage from './routes/edit-page/edit-page';


function Root() {
  return (
    <div>
      <Redirect to="/home" />
      <Route path="/home" component={MainPage} />
      <Route path="/edit-task/:id" component={EditPage} />
    </div>
  );
}

export default Root;
