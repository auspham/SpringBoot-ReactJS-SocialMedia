import React, {Component} from 'react';


class SideContentComponent extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="col3">
                <div className="ui-block">
                    <div className="ui-title">Profile Info</div>
                    <div className="ui-content">
                        <div className="personal-info">
                            <li><span className="title">About Me</span>
                            <span className="text">I am a Computer Science Student, who loves Martial Arts, Hiking and Camping</span></li>
                            <li><span className="title">Student No.</span>
                            <span className="text">s3429599</span></li>
                            <li><span className="title">Courses</span>
                            <span className="text">SEPT, PCP, CT and OSP</span></li>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default SideContentComponent;