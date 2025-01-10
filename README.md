# COP4331 Group 33 Contact Manager 
## **Description**
This is a full-stack application project for COP4331 Processes of Object Oriented Software. We will be using the LAMP stack to create a contact manager with login and signup functions and provide the user with abilities to create, search, edit, and delete contacts. 


## **Group Members & Roles:**
- Nathan Davis: API
- Yama Jiang: Frontend
- Alex Nash: Project Manager
- Lucas Salinas: API
- Lance Nelson: Database

## **Git**
Making file changes:
<br/> https://www.youtube.com/watch?v=nlF-SOrod5o  
<br/>More detailed video on Git collaboration:
<br/>https://www.youtube.com/watch?v=ygqx50-JHEE
## **Cloning**
Navigate to where you want to clone repo 
<br/> *example with desktop:* 
```bash
cd ~/Desktop
```
Clone the repo with HTTPS  or SSH (click the green "Code" drop down arrow)
```bash
git clone <HTTPS URL or SSH>
```
The project should now be cloned to your desktop/where you cd into 

## **Branching**
List all the branches
```bash
git branch -a
```
Switch to the branch you want to work on
```bash
git checkout <branch-name>
```
Now you can make changes to files then commit & push to your branch 

<br/> If you need to make a new branch:
```bash
git checkout -b <new branch name>
```

## **Pulling**
Pulling is important if we have multiple people working on the same project or branch 
<br/> this makes sure that you have the latest changes from the repo 
```bash
git pull origin <branch-name>
```

## **Committing**
Check status of commits (do this frequently)
```bash
git status
```
Add current working directory
```bash
git add .
```
Add specific file
```bash
git add <file name here>
```
Commit with a description/message 
```bash
git commit -m "description here"
```
Push it to the branch you are working on 
```bash
git push origin <branch name here>
```
