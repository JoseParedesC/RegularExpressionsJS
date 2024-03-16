var present = "Am i|Are you|Is he|Is she|Is it|Are we|Are they"
var past = "Was i|Were you|Was he|Was she|Was it|Were they|Where we"
var negacion = "Am not i|Aint|Are not you|Aren't you|Is not he|Isn't he|Is not she|Isn't she|Is not it|Isn't it|Are not we|Aren't we|Are not they|Aren't they"

let reg = new RegExp(`^(${negacion}|${present}${present != "" && past != "" ? "|" : ""}${past}) (.*[?.])$`)

// //no subir, son pruebas

// let reg2 = new RegExp(`^(Am [not]? i|Are [not]? you|Is [not]? he|Is [not]? she|Is [not]? it|Are [not]? we|Are [not]? they) (.*[?.])$`)

// let reg3 = new RegExp("(Am|Are|Is)[not]?(I|You|She|He|It|We|They)")


function start() {
	document.getElementById("start").style.display = "none"
	document.getElementById("form").style.display = "block"

	addMoreInputs(1)
}


function validate() {
	let inputs = document.querySelectorAll('input[type="text"]')

	inputs.forEach((elem, index) => {
		sentence = elem.value

		if (sentence != "")
			if (reg.test(sentence))
				mostrarSuccess(index + 1)
			else
				mostrarError(index + 1)
		else
			hideMessage(index + 1)

	})
}

function hideMessage(index) {
	var wrong = document.getElementsByClassName(`wrong_${index}`)
	var success = document.getElementsByClassName(`success_${index}`)

	success[0].style.display = "none"
	wrong[0].style.display = "none"
}

function mostrarSuccess(index) {
	var wrong = document.getElementsByClassName(`wrong_${index}`)
	var success = document.getElementsByClassName(`success_${index}`)

	success[0].style.display = "block"
	wrong[0].style.display = "none"
}


function mostrarError(index) {
	var success = document.getElementsByClassName(`success_${index}`)
	var wrong = document.getElementsByClassName(`wrong_${index}`)

	wrong[0].style.display = "block"
	success[0].style.display = "none"
}

function addMoreInputs(number) {

	let new_div =
		`<div class="success_${number}" style="color: green; display:none; font-weight: bold;"><label>Sentence OK!</label></div>
<div class="wrong_${number}" style="color: #b30606; display:none; font-weight: bold;"><label>Sentence Wrong!</label></div>
	<div style="margin-bottom: 10px;">
	    <label>${number} Sentence</label>
	    <input type="text" id="sentence_${number}">
	</div>`

	const elem = document.getElementById('context')

	let inputs = document.querySelectorAll('input[type="text"]')

	elem.innerHTML += new_div

	const new_input = document.getElementById(`sentence_${number}`)

	new_input.onfocusout = function (event) {

		let inputs = document.querySelectorAll('input[type="text"]')
		if (inputs.length < 5 && new_input.value != "")
			addMoreInputs(inputs.length + 1);
	}

	new_input.addEventListener('focusout', new_input.onfocusout)


	inputs.forEach((e, i) => {
		document.getElementById(`sentence_${i + 1}`).value = e.value
	})


}



