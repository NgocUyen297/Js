var Validator = function({formSelector, options} ){
    function getParent(element, selector){
        while(element.parentElement){ // nếu thẻ cha của thẻ đó tồn tại mới lặp 
            if(element.parentElement.matches(selector)){
                return element.parentElement
            }
            element = element.parentElement
        }
    }
    var formRules = {}

    var validateRules = {
        required: function(value){
            return value ? undefined: 'Vui long nhap truong nay'
        },
        email: function(value){
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined: 'Trường này phải là email'
        },
        min: function(min){
            return function(value){
                return value.lenght >= min ? undefined: `Vui lòng nhập ${min} ký tự`
            }
        },
        max: function(max){
            return function(value){
                return value.lenght >= max ? undefined: `Vui lòng nhậ tối đa ${max} ký tự`
            }
        }
    }
    var formElement = document.querySelector(formSelector)
    if(formElement){
        var inputElments = formElement.querySelectorAll('input[name][rules]')
        for (var input of inputElments){
            // Lấy ra các rule của từng ô input
            var rules =  input.getAttribute('rules').split('|')
            for(var rule of rules){
                // nếu rule mà min hay mã thì cắt chuỗi nó ra
                var ruleFunc = validateRules[rule]
                var isRuleHasValue = rule.includes(':')
                var ruleInfo;
                if(isRuleHasValue){
                   ruleInfo =  rule.split(':')
                   //ruleInfo[1] Tên của function validate vd: min, max
                   //ruleInfo[0] Gía trị của hàm min hoặc max
                   ruleFunc = validateRules[ruleInfo[0]](ruleInfo[1])
                }
                //tường ô input sẽ mảng các function rules của nó
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc)
                }else{
                    formRules[input.name] = [ruleFunc]
                }
            }

            // Lắng nghe sự kiện blur và onchange
            input.onblur = handelValidate
            input.oninput = clearError
        }
        // Hàm thực hiện validate
        function handelValidate(event){
            var rules = formRules[event.target.name]
            var errorMessage; 
            // Tại vì mỗi rule bây giờ là những function của rule đó
            rules.find(function(rule){
                errorMessage =  rule(event.target.value)
                return errorMessage
            })
            //Nếu có lỗi thì hiển thị lỗi ra UI
            if(errorMessage){
                var errorElement = getParent(event.target, '.form-group').querySelector('.form-message')
                if(errorElement){
                    errorElement.innerText = errorMessage
                }
            }
            // Nếu không lỗi trả về true. (!undefined)
            // Nếu có lỗi trả về false. 
            return !Boolean(errorMessage)
        }

        function clearError(){
            var errorElement = getParent(event.target, '.form-group').querySelector('.form-message')
            if(errorElement.innerText){
                errorElement.innerText = ''
            }
        }

        // xử lý sự kiện submit form 
        formElement.onsubmit =  function(event){
            event.preventDefault()
            var isFormValid = true
            var inputElements = formElement.querySelectorAll('input[name][rules]')
            for (var input of inputElements){
                // hàm này lấy một event.target khi ko có target thi chuyền vào như thế này
                if (!handelValidate({
                    target: input
                })){
                    isFormValid = false
                }
            }
            if(isFormValid){
                var ElementInputs = document.querySelectorAll('input:not([disable])')
                var formvalues = Array.from(ElementInputs).reduce(function(values, input){
                    switch(input.type){
                        case 'checkbox':
                            if (!input.matches(':checked')) return values
                            if(!Array.isArray(values[input.name]) ){
                                values[input.name] = []
                            }
                            values[input.name].push(input.value)
                            break
                        case 'file': 
                            values[input.name] = input.files
                            break;
                        default: 
                             values[input.name]= input.value
                    }
                    return values;
                },{})
                 options.onSubmit(formvalues)
            }else{
                formElement.onsubmit()
            }
        }
    }
}

Validator({
    formSelector:'#form',  
    options:{
        onSubmit: function(data){
            console.log(data)
        }
    }
})