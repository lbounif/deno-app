pipeline {
    agent any
    stages{
        def commit_id      //define variable commit_id
        stage('build') {
            steps {
                sh "docker-compose up -d"  
                    
            }
        }                               
        stage('Preparation') {     
            checkout scm                                      //make git pull of repo in Jenkins
            sh "git rev-parse --short HEAD > .git/commit-id"  //give us the commit id and put it in file commit-id inside .git folder                      
            commit_id = readFile('.git/commit-id').trim()     //put the commit id of temporary file in the variable commit_id
        }
        stage('test') {
            nodejs(nodeJSInstallationName: 'nodejs') {
            sh 'npm install --only=dev'                    //Install only dev dependencies (mocha) for test
            sh 'npm test'
            }
        }
        stage('docker build/push') {
            docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {      //define dockerhub registry and credentials id
            def app = docker.build("lbounif/deno-app:${commit_id}", '.').push()   //build and push
            }
        }
    }
    post {
        success {
            emailext body: 'Success build', 
            recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], 
            subject: 'successfull build'
        }

    }
}