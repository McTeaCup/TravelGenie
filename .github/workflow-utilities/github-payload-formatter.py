import sys
import json

document_data = str()
arguments = sys.argv

def unpack_issues(filename, format):
    
    with open(filename) as data:
        payload = json.load(data)

        #Get the count of open/closed issues
        issue_states = [0, 0, 0]
        for issue in payload:
            if(issue['state'] == 'OPEN'):
                issue_states[0] += 1
            elif(issue['state'] == 'CLOSED'):
                issue_states[1] += 1

        print(f'\nIssues: [Open: {issue_states[0]} | Closed: {issue_states[1]}]\n')

        # For each issue
        for issue in payload:
            #If there are any issues that are open, print info about them 
            if(issue['state'] == 'OPEN'):

                #Title + date of creation
                title_time_state = f"[{issue['state']}] {issue['title']} (Created at {issue['createdAt'][:10]})"

                #Author
                author = f"By: {issue['author']['login']}"

                #Assigned to
                assigned_to = ''
                for assaginee in issue['assignees']:
                    assigned_to += f"Assigned: {assaginee['name']} "

                #Description
                body = f"\n{issue['body']}\n"

                #Labels
                labels = '['
                for label in issue['labels']:
                    labels += f" {label['name']} "
                labels += ']'

                #URL
                url = issue['url']

                if(format[1] == 's'):
                    print(f'- {title_time_state}\n{assigned_to}\nURL: {url}\n')
                
                elif(format[1] == 'l'):
                    print(f'- {title_time_state}{body}\n{author}\n{assigned_to}\nLabels: {labels}\nURL: {url}')

            #If there are any issues that are closed, print info about them
            if(issue['state'] == 'CLOSED'):
                pass

print("")
unpack_issues(arguments[1], arguments[2])
print("")

