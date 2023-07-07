import React, { } from 'react';

function Calendar() {
    return (
        <div >
            {/* PAGE CONTAINER*/}
            <div className="page-container">
                {/* MAIN CONTENT*/}
                <div className="main-content">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <div className="au-card">
                                        <div id="calendar" />
                                    </div>
                                </div>{/* .col */}
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="copyright">
                                        <p>Copyright © 2018 Colorlib. All rights reserved. Template by <a href="https://colorlib.com">Colorlib</a>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Calendar;
