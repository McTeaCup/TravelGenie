import sys
import json
import datetime

document_data = str()
arguments = sys.argv

date = str(datetime.datetime.today())[:10].split('-')
current_date = datetime.datetime(int(date[0]), int(date[1]), int(date[2]))

class c_issue():
    def __init__(self) -> None:
        self.state = str()
        self.title = str()
        self.body = str()
        self.milestone = []
        self.author = str()
        self.assignees = []
        self.lables = str()
        self.url = str()
        self.creation_date = datetime.datetime
        self.days_open = datetime.datetime
        self.merge_date = str()
        self.id = str()
        self.closed_at = str()

    def __eq__(self, value: object) -> bool:
        return self == value
class c_pr():
    def __init__(self) -> None:
        self.author = str()
        self.title = str()
        self.body = str()
        self.to_branch = str()
        self.from_branch = str()
        self.mergeable = str()
        self.merged_at = datetime.datetime
        self.milestone = str()
        self.state = str()
        self.url = str()
        self.files = []
        self.created_at = str()
        self.creation_date = str()
        self.labels = []
        pass

    def __eq__(self, value: object) -> bool:
        return self == value

fetched_issues = []
fetched_prs = []

def unpack_issues(filename):
    '''
    Unpacks information regarding the repo's issues that has been logged, shows all open/closed
    issues. If an issue has been closed for a longer time than 7 days it will automatically not
    be printed.
    '''
    with open(filename) as data:
        payload = json.load(data)
        
        # For each issue
        for issue in payload:
            ticket = c_issue()

            creation_date_string = str(issue['createdAt'])[:10].split('-')

            ticket.creation_date = datetime.datetime(int(creation_date_string[0]), int(creation_date_string[1]), int(creation_date_string[2]))
            ticket.state = issue['state']
            ticket.title = issue['title']
            ticket.body = issue['body']
            ticket.days_open = abs(current_date - ticket.creation_date)
            ticket.milestone = issue['milestone']
            ticket.author = issue['author']['login']
            ticket.assignees = issue['assignees']
            ticket.lables = issue['labels']
            ticket.url = issue['url']
            ticket.id = issue['id']
            ticket.closed_at = issue['closedAt']

            #If there are any issues that are closed, print info about them
            fetched_issues.append(ticket)

def unpack_rp(filename):
    with open(filename) as data:
        payload = json.load(data)

        for pull_request in payload:
            pr = c_pr()

            creation_date_string = pull_request['createdAt']

            pr.author = pull_request['author']
            pr.title = pull_request['title']
            pr.body = pull_request['body']
            pr.to_branch = pull_request['baseRefName']
            pr.from_branch = pull_request['headRefName']
            pr.mergeable = pull_request['mergable']
            pr.merged_at = pull_request['mergedAt']
            pr.milestone = pull_request['milestone']
            pr.state = pull_request['state']
            pr.created_at = pull_request['createdAt']
            pr.url = pull_request['url']
            pr.files = pull_request['files']
            pr.creation_date = datetime.datetime(int(creation_date_string[0]), int(creation_date_string[1]), int(creation_date_string[2]))

            fetched_prs.append(pr)

def print_issues(issues, format):
    #Get the count of open/closed issues
    issue_states = [0, 0]
    for issue in issues:
        if(issue.state == 'OPEN'):
            issue_states[0] += 1
        elif(issue.state == 'CLOSED'):
            issue_states[1] += 1

    print(f'\nIssues: [Open: {issue_states[0]} | Closed: {issue_states[1]}]\n')

    for ticket in issues:
        days_open = int(str(ticket.creation_date - current_date).split(' ')[0])
        if(ticket.state == 'OPEN' or days_open <= 7 and ticket.state == 'CLOSED'):
            if(format[1] == 's'):
                print(f"--- [{ticket.state}] {ticket.title}\nCreated: {ticket.creation_date} [Open for {ticket.days_open}]\nMilestone: {ticket.milestone}\nAuthor: {ticket.author}\nAssigned: {ticket.assignees[0]['login']}\nURL: {ticket.url}\n")
            elif(format[1] == 'l'):
                print(f"--- [{ticket.state}] {ticket.title}\n{ticket.body}\nMilestone: {ticket.milestone}\nCreated: {ticket.creation_date} [Open for {ticket.days_open}]\nLabel(s): {ticket.lables[0]['name']}\nAuthor: {ticket.author}\nAssigned: {ticket.assignees[0]['name']}\nURL: {ticket.url}\n")

def print_pr(prs, format):
    #Get the count of open/closed issues
    issue_states = [0, 0]
    for pr in prs:
        if(pr.state == 'OPEN'):
            issue_states[0] += 1
        elif(pr.state == 'CLOSED'):
            issue_states[1] += 1

    print(f'\nIssues: [Open: {issue_states[0]} | Closed: {issue_states[1]}]\n')

    for pr in prs:
        days_open = int(str(pr.creation_date - current_date).split(' ')[0])
        if(pr.state == 'OPEN' or days_open <= 7 and pr.state == 'CLOSED'):
            if(format[1] == 's'):
                print(f"--- [{pr.state}] {pr.title}\nCreated: {pr.creation_date} [Open for {pr.days_open}]\nMilestone: {pr.milestone}\nAuthor: {pr.author}\nAssigned: {pr.assignees[0]['login']}\nURL: {pr.url}\n")
            elif(format[1] == 'l'):
                print(f'''
                      --- [{pr.state}] {pr.title}\n{pr.body}
                      Milestone: {pr.milestone}
                      Created: {pr.created_at} [Open for {pr.days_open}]
                      Label(s): {pr.lables[0]['name']}
                      Author: {pr.author}
                      State: {pr.mergable}\nURL: {pr.url}\n
                        ''')


print("")
unpack_issues('issues_dummy.json')
print_issues(fetched_issues, arguments[1])
unpack_rp('pr_dummy.json')
print_issues(fetched_prs, arguments[1])
print("")

