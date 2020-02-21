const issues = [
    {
        id: 1, status: 'Assigned', owner: 'Eddie', effort: 14,
        created: new Date('2018-08-16'), due: new Date('2018-08-30'),
        title: 'Missing bottom border on panel',
    }, {
        id: 2, status: 'New', owner: 'Ravan', effort: 5,
        created: new Date('2018-08-15'), due: undefined,
        title: 'Error in console when clicking Add',
    }
];

const sampleIssue = {
    status: 'New', owner: 'Pieta',
    title: 'Completion date should be optional',
}

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the issue filter.</div>
        )
    }
}

const IssueRow = props => {
    const issue = props.issue
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.due ? issue.due.toDateString() : ''}</td>
            <td>{issue.title}</td>
        </tr>
    )
}

const IssueTable = props => {
    const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />)
    return (
        < table className="bordered-table" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Due Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </table >
    )
}

class IssueAdd extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the issue add.</div>
        )
    }
}

class IssueList extends React.Component {
    constructor() {
        super()
        this.state = { issues: issues }

        setTimeout(() => {
            this.createIssue(sampleIssue)
        }, 2000)
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        setTimeout(() => {
            this.setState(() => ({ issues: issues }))
        }, 500)
    }

    createIssue(issue) {
        issue.id = this.state.issues.length + 1
        issue.created = new Date()
        const newIssueList = this.state.issues.slice()
        newIssueList.push(issue)
        this.setState(() => ({ issues: newIssueList }))
    }

    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd />
            </React.Fragment>
        )
    }
}

ReactDOM.render(<IssueList />, document.getElementById('content'))