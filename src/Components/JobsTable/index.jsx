import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

function Table({ data }) {

    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Remote</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ?
                        data.map((job => <tr key={job.id}>
                            <td>{job.title}</td>
                            <td>{job.company?.name || 'name not provided'}</td>
                            <td>{job.countries[0]?.name || 'country not provided'}</td>
                            <td>{job.cities[0]?.name || 'city not provided'}</td>
                            <td>{job.remotes[0]?.type ? <i className="fas fa-check" style={{color: '#80caa9'}} /> : <i className="fas fa-times" style={{ color: '#ff7e74' }} />}</td>
                        </tr>))
                        :
                        <tr>
                            <td colSpan="5">No jobs to be shown</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;

Table.defaultProps = {
    data: []
};

Table.propTypes = {
    data: PropTypes.array
};


