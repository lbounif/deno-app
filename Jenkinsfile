pipeline {
    agent any
    stages{
        stage('build') {
            steps {
                sh "docker-compose up -d"  
                    
            }
        }
        stage('Publish') {
            steps {
                withDockerRegistry([ credentialsId: "dockerhub", url: "" ]) {
                    sh  'docker push deno-deploy'
                }
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