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
            <td>{issue.created}</td>
            <td>{issue.effort}</td>
            <td>{issue.due ? issue.due : ''}</td>
            <td>{issue.title}</td>
        </tr>
    )
}

const IssueTable = props => {
    const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />)
    return (
        <table className="bordered-table" >
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
        </table>
    )
}

class IssueAdd extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
        }

        this.props.createIssue(issue);
        form.owner.value = ""; form.title.value = "";
    }

    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <button>Add</button>
            </form>
        )
    }
}

class IssueList extends React.Component {
    constructor() {
        super()
        this.state = { issues: [] }
        this.createIssue = this.createIssue.bind(this)
    }

    componentDidMount() {
        this.loadData()
    }

    async loadData() {
        const query = `query {
            issueList {
                id title status owner
                created effort due
            }
        }`;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ query })
            })
    
            const result = await response.json()
            const { issueList } = result.data
            this.setState(() => ({
                issues: issueList
            }))
        } catch(e) {
            this.setState(() => ({
                issues: this.state.issues
            }))
        }      
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
                <IssueAdd createIssue={this.createIssue} />
            </React.Fragment>
        )
    }
}

ReactDOM.render(<IssueList />, document.getElementById('content'))