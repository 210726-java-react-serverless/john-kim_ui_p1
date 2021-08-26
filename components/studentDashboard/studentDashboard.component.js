import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';
import state from '../../util/state.js';
import router from '../../app.js';

StudentDashboardComponent.prototype = new ViewComponent('studentDashboard');

function StudentDashboardComponent(){

    let courseFieldElement;
    let courseButtonElement;
    let errorMessageElement;

    let course = '';

    //checking the opening course
    function updateCourse(e){
        course = e.target.value;
        console.log(course);
    }

    function updateErrorMsg(){
        if(errorMessage){
            errorMessageElement.removeAttribute('hidden');
            errorMessageElement.innerText = errorMessage;
        }else {
            errorMessageElement.setAttribute('hidden', 'true');
            errorMessageElement.innerText = '';
        }
    }  

 /*   async function courseDashboard(){
        if(!true){
            updateErrorMsg('Please enter your answer!');
            return;
        }else{
            updateErrorMsg('');
        } 

        let  courseInfor = {
            course: true,
        }

        let status = 0;

        let response = await fetch(`${env.apiUrl}/enroll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseInfor)
        });
        // Take the header and log it
        let jwt = response.headers.get('Authorization');
        
        if (jwt === null) {
            console.log('Sorry! Token not found!');
        } else {
            state.jwt = jwt;
        }

        let data = await response.json();
        status = response.status;

        state.authUser = data;
        console.log(data);

        router.navigate('/enrolledCourse'); 

    }     */

    function courseDashboard() {
        const [data, dataSet] = useState<any>(null)
      
        const fetchMyAPI = useCallback(async () => {
          let response = await fetch(`${env.apiUrl}/enroll`)

          response = await response.json()
          dataSet(response)
        }, [])
      
        useEffect(() => {
          fetchMyAPI()
        }, [fetchMyAPI])
      
        return (
          <div>
            <div>data: {JSON.stringify(data)}</div>
            <div>
              <button onClick={fetchMyAPI}>manual fetch</button>
            </div>
          </div>
        )
      }

        this.render = function(){

            StudentDashboardComponent.prototype.injectTemplate(() => {

                courseButtonElement = document.getElementById('dashboard-form-button');
                errorMessageElement = document.getElementById('error-msg');

                courseFieldElement = document.getElementById('login-form-course');
                courseFieldElement.addEventListener('keyup', updateCourse);

                courseButtonElement.addEventListener('click', courseDashboard);
                
            });
            StudentDashboardComponent.prototype.injectStyleSheet();
        }

}

export default new StudentDashboardComponent();