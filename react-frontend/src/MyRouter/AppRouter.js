import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleCompaniesPage from "../components/app_components/CompaniesPage/SingleCompaniesPage";
import CompanyProjectLayoutPage from "../components/app_components/CompaniesPage/CompanyProjectLayoutPage";
import SingleFlightsPage from "../components/app_components/FlightsPage/SingleFlightsPage";
import FlightProjectLayoutPage from "../components/app_components/FlightsPage/FlightProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/companies/:singleCompaniesId" exact element={<SingleCompaniesPage />} />
<Route path="/companies" exact element={<CompanyProjectLayoutPage />} />
<Route path="/flights/:singleFlightsId" exact element={<SingleFlightsPage />} />
<Route path="/flights" exact element={<FlightProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
