import sys
import json
import datetime
import os 
import pathlib
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
        return self == value8888
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
        self.days_open = int()
        self.assignees = []
        pass

    def __eq__(self, value: object) -> bool:
        return self == value

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
            total_time_open = current_date - datetime.datetime( int(creation_date_string[0]), int(creation_date_string[1]), int(creation_date_string[2]))

            ticket.creation_date = datetime.datetime(int(creation_date_string[0]), int(creation_date_string[1]), int(creation_date_string[2]))
            ticket.state = issue['state']
            ticket.title = issue['title']
            ticket.body = issue['body']
            ticket.days_open = f"{str(total_time_open).split(' ')[0]}"
            ticket.milestone = issue['milestone']
            ticket.author = issue['author']['login']

            if (issue['assignees'] != None):
                ticket.assignees = issue['assignees']
            else:
                ticket.assignees = "Not assigned yet"
            
            
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
            creation_date_string = str(pull_request['createdAt'])[:10].split('-')

            pr.creation_date = datetime.datetime(int(creation_date_string[0]), int(creation_date_string[1]), int(creation_date_string[2]))
            
            pr.state = pull_request['state']
            pr.title = pull_request['title']
            pr.body = pull_request['body']
            pr.author = pull_request['author']['login']
            pr.milestone = pull_request['milestone']
            pr.created_at = pull_request['createdAt']
            pr.days_open = abs(current_date - pr.creation_date)
            pr.from_branch = pull_request['headRefName']
            pr.to_branch = pull_request['baseRefName']
            
            for label in pull_request['labels']: 
                pr.labels.append(label['name'])
            pr.mergeable = pull_request['mergeable']
            pr.merged_at = pull_request['mergedAt']
            pr.files = pull_request['files']
            pr.url = pull_request['url']
            
            fetched_prs.append(pr)

def unpack_branches(filename):
    with open (filename, 'r') as file:
        for line in enumerate(file):
            fetched_branches.append(f'{line[1][8:]}')

def create_markdown():
    with(open(f'report.md', 'w') as report):
        #Table of contence
        report.write("## QUICK STATUS\n")
        report.write("### Issues\n")
        report.write(f"|    STATE   |   NAME    | DAYS OPEN | LABELS | AUTHOR |\n")
        report.write(f"|    :--     |   :--     |   :--     |  :--   |  :--   |\n")
        for f_issue in fetched_issues:
            labels = str()
            if(f_issue.lables != None):
                for label in f_issue.lables:
                    labels += f"[{label['name']}] "

            report.write(f"| {f_issue.state} | [{f_issue.title}]({f_issue.url}) | {str(f_issue.days_open)} day(s) | {labels} | {f_issue.author}\n")
        
        #Table of contence
        report.write("### Pull Requests\n")
        #report.write("Pull requests that are still open or has been closed for more than 7 days. Read more on \n\n")
        report.write(f"|    STATE   |   NAME    | DAYS OPEN | LABELS | AUTHOR | AFFECTED BRANCHES |\n")
        report.write(f"|    :--     |   :--     |   :--     |  :--   |  :--   |         :--       |\n")
        for f_pr in fetched_prs:
            labels = str()
            if(f_pr.labels != None):
                for label in f_pr.labels:
                    labels += f"[{label}] "

            report.write(f"| {f_pr.state} **({f_pr.mergeable})** | [{f_pr.title}]({f_pr.url}) | {str(f_pr.days_open)[0]} days | {labels} | {f_pr.author} | `{f_pr.from_branch}` -> `{f_pr.to_branch}`\n")

        report.write('### Active Branches\n')
        
        #Branches
        frontend_branches = []
        backend_branches = []
        devops_branches = []
        dev_branches = []
        other_branches = []

        for branch in fetched_branches:
            branch_name = (f'- `{str(branch).split()[1][11:]}`')
            define_name = str(branch).split()[1][11:].lower().split('-')[0]
            
            if(define_name == 'frontend'):
                frontend_branches.append(branch_name)
            
            elif(define_name == 'backend'):
                backend_branches.append(branch_name)
            
            elif(define_name == 'devops'):
                devops_branches.append(branch_name)
            
            elif(define_name == 'dev'):
                dev_branches.append(branch_name)

            else:
                other_branches.append(branch_name)
        
        report.write('#### Frontend\n\n')
        for f_branch in frontend_branches:
            report.write(f"{f_branch}\n")
        
        report.write('#### Backend\n\n')
        for b_branch in backend_branches:
            report.write(f"{b_branch}\n")

        report.write('#### Dev-Ops\n\n')
        for do_branch in devops_branches:
            report.write(f"{do_branch}\n")

        report.write('#### Dev\n\n')
        for d_branch in dev_branches:
            report.write(f"{d_branch}\n")

        report.write('#### Others\n\n')
        for o_branch in other_branches:
            report.write(f"{o_branch}\n")

fetched_issues = []
fetched_prs = []
fetched_branches = []

current_path = pathlib.Path().resolve()

if(len(sys.argv) > 1 and sys.argv[1] == '--debug'):
    issue_path = 'issues.json'
    pr_path = 'pull_request.json'
    branch_path = 'branches.txt'

else:
    issue_path = '.github/workflow-utilities/issues.json'
    pr_path = '.github/workflow-utilities/pull_request.json'
    branch_path = '.github/workflow-utilities/branches.txt'

unpack_issues(issue_path)
unpack_rp(pr_path)
unpack_branches(branch_path)

create_markdown()

