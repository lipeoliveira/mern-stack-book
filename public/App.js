'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

var jsonDateReviver = function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) {
        return new Date(value);
    }
    return value;
};

var IssueFilter = function (_React$Component) {
    _inherits(IssueFilter, _React$Component);

    function IssueFilter() {
        _classCallCheck(this, IssueFilter);

        return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
    }

    _createClass(IssueFilter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'This is a placeholder for the issue filter.'
            );
        }
    }]);

    return IssueFilter;
}(React.Component);

var IssueRow = function IssueRow(props) {
    var issue = props.issue;
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            null,
            issue.id
        ),
        React.createElement(
            'td',
            null,
            issue.status
        ),
        React.createElement(
            'td',
            null,
            issue.owner
        ),
        React.createElement(
            'td',
            null,
            issue.created.toDateString()
        ),
        React.createElement(
            'td',
            null,
            issue.effort
        ),
        React.createElement(
            'td',
            null,
            issue.due ? issue.due.toDateString() : ''
        ),
        React.createElement(
            'td',
            null,
            issue.title
        )
    );
};

var IssueTable = function IssueTable(props) {
    var issueRows = props.issues.map(function (issue) {
        return React.createElement(IssueRow, { key: issue.id, issue: issue });
    });
    return React.createElement(
        'table',
        { className: 'bordered-table' },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'ID'
                ),
                React.createElement(
                    'th',
                    null,
                    'Status'
                ),
                React.createElement(
                    'th',
                    null,
                    'Owner'
                ),
                React.createElement(
                    'th',
                    null,
                    'Created'
                ),
                React.createElement(
                    'th',
                    null,
                    'Effort'
                ),
                React.createElement(
                    'th',
                    null,
                    'Due Date'
                ),
                React.createElement(
                    'th',
                    null,
                    'Title'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            issueRows
        )
    );
};

var IssueAdd = function (_React$Component2) {
    _inherits(IssueAdd, _React$Component2);

    function IssueAdd() {
        _classCallCheck(this, IssueAdd);

        var _this2 = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

        _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
        return _this2;
    }

    _createClass(IssueAdd, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var form = document.forms.issueAdd;
            var issue = {
                owner: form.owner.value,
                title: form.title.value,
                due: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            };

            this.props.createIssue(issue);
            form.owner.value = "";
            form.title.value = "";
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { name: 'issueAdd', onSubmit: this.handleSubmit },
                React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
                React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
                React.createElement(
                    'button',
                    null,
                    'Add'
                )
            );
        }
    }]);

    return IssueAdd;
}(React.Component);

var IssueList = function (_React$Component3) {
    _inherits(IssueList, _React$Component3);

    function IssueList() {
        _classCallCheck(this, IssueList);

        var _this3 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

        _this3.state = { issues: [] };
        _this3.createIssue = _this3.createIssue.bind(_this3);
        return _this3;
    }

    _createClass(IssueList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var query, response, body, result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                query = 'query {\n            issueList {\n                id title status owner\n                created effort due\n            }\n        }';
                                _context.prev = 1;
                                _context.next = 4;
                                return fetch('/graphql', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ query: query })
                                });

                            case 4:
                                response = _context.sent;
                                _context.next = 7;
                                return response.text();

                            case 7:
                                body = _context.sent;
                                result = JSON.parse(body, jsonDateReviver);

                                this.setState(function () {
                                    return {
                                        issues: result.data.issueList
                                    };
                                });
                                _context.next = 14;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context['catch'](1);

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 12]]);
            }));

            function loadData() {
                return _ref.apply(this, arguments);
            }

            return loadData;
        }()
    }, {
        key: 'createIssue',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(issue) {
                var query;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                query = 'mutation issueAdd($issue: IssueInputs!) {\n            issueAdd(issue: $issue) {\n                id\n            }\n        }';
                                _context2.prev = 1;
                                _context2.next = 4;
                                return fetch('/graphql', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ query: query, variables: { issue: issue } })
                                });

                            case 4:
                                this.loadData();
                                _context2.next = 9;
                                break;

                            case 7:
                                _context2.prev = 7;
                                _context2.t0 = _context2['catch'](1);

                            case 9:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[1, 7]]);
            }));

            function createIssue(_x) {
                return _ref2.apply(this, arguments);
            }

            return createIssue;
        }()
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    'h1',
                    null,
                    'Issue Tracker'
                ),
                React.createElement(IssueFilter, null),
                React.createElement('hr', null),
                React.createElement(IssueTable, { issues: this.state.issues }),
                React.createElement('hr', null),
                React.createElement(IssueAdd, { createIssue: this.createIssue })
            );
        }
    }]);

    return IssueList;
}(React.Component);

ReactDOM.render(React.createElement(IssueList, null), document.getElementById('content'));