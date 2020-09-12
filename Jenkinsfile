pipeline {
    agent any

    stages {
        stage('Notify') {
            steps {
                echo 'Building..'
            }
        }
        stage('Build') {
            steps {
                sh 'npm i'
                sh 'npm run build'
                sh 'docker build --tag=device-ui-app .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -p 8000:80 device-ui-app'
            }
        }
    }
}
