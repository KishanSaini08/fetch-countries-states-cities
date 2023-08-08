


const country = document.querySelector("#country")
const states = document.querySelector("#states")
const city = document.querySelector("#city")


let headers = new Headers();
headers.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");

let requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};


fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    .then((Response) => { return Response.json() })
    .then((result) => {
        console.log(result);

        showdetails(result)
    })

function showdetails(result) {
    for (let i = 0; i < result.length; i++) {
        let opt = document.createElement("option")
        opt.innerHTML = result[i].name;
        opt.value = result[i].iso2

        country.append(opt)

        country.onchange = () => {
            states.innerHTML=  '<option value="" selected disabled>select country</option>'
            city.innerHTML='<option value="" selected disabled>select city</option>'
            let b = country.value
            fetch(`https://api.countrystatecity.in/v1/countries/${b}/states`, requestOptions)
                .then(response1 => { return response1.json() })
                .then(result1 => {
                    console.log(result1)
                    showdetails1(result1)
                })
            // .catch(error => console.log('error', error));
            function showdetails1(result1) {
                for (let x = 0; x < result1.length; x++) {
                    let opt1 = document.createElement("option")
                    opt1.innerHTML = result1[x].name
                    opt1.value = result1[x].iso2
                    states.append(opt1)
                }
            }
        }
        states.onchange = () => {
            city.innerHTML='<option value="" selected disabled>select city</option>'
            let c = states.value
            let b = country.value
            fetch(`https://api.countrystatecity.in/v1/countries/${b}/states/${c}/cities`, requestOptions)
                .then(response2 => { return response2.json() })
                .then(result2 => {
                    console.log(result2)
                    showdetails2(result2)
                })
            // .catch(error => console.log('error', error));
            function showdetails2(result2) {
                for (let y = 0; y < result2.length; y++) {
                    let opt2 = document.createElement("option")
                    opt2.innerHTML = result2[y].name
                    opt2.value = result2[y].iso2
                    city.append(opt2)
                }
            }
        }



    }


}
