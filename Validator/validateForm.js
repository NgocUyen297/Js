function Validator(options){
    function getParent(element, selector){
        while(element.parentElement){ // nếu thẻ cha của thẻ đó tồn tại mới lặp 
            if(element.parentElement.matches(selector)){
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    var formElement = document.querySelector(`${options.form}`)

    var validate = function(input, rule){
        var errorElement = getParent(input, options.formGroupSelector).querySelector(options.errorSelector)
        var errorMessage;
        //Lấy ra các rule
        // nếu có rule lỗi thì hiển rule đo đầu tiên
        var rules = selectorRules[rule.selector]
        for (var i =0; i< rules.length; i++){
            switch(input.type){
                case 'checkbox':
                case 'radio':
                    errorMessage = rules[i](formElement.querySelector(rule.selector+':checked'))
                    break
                case 'file':
                    
                    break
                default: 
                    errorMessage = rules[i](input.value)
            }
           
           if(errorMessage){
               break;
           }
        }

        if(errorMessage){
            errorElement.innerText = errorMessage
        }else{
            errorElement.innerText = ''
        }
        return !Boolean(errorMessage)
    }
    var selectorRules = {}
    var isFormValid = true
     if(formElement){
        formElement.onsubmit = function(event){
            event.preventDefault()
            options.rules.forEach(function(rule){
                var inputElement = document.querySelector(rule.selector)
                var isValid = validate(inputElement, rule)
               if(!isValid){
                isFormValid = false
               }
                
            })
            
            if(isFormValid){
                if(typeof options.onSubmit === 'function'){
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
                }
            }else { //  submit với hành vi mặc định 
                formElement.onsubmit()
            }
                
        }

        options.rules.forEach(rule => {
            var input = formElement.querySelector(rule.selector)
            var error = getParent(input, options.formGroupSelector).querySelector(options.errorSelector)
            
            // Lưu lại rule mỗi input
            // Nếu input chỉ có 1 validate thì selectorRule của nó sẽ không là cái mảng
            // Còn nếu nó là cái mảng thì thêm hàm test vào trong selectorRule của nó
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test)
            }else {
                selectorRules[rule.selector] = [rule.test]
            }
            // xử ly khi người dùng blur ra ngoài
            input.onblur = function(){
                validate(input, rule)
            }

            // Xử lý khi người dùng nhập
            input.oninput = function(){
                error.innerText = ''
            }
        });
     }
}


// Nguyên tắc check lỗi
// 1. Khi có lỗi trả ra message lỗi
// 2. Khi không có lỗi thì không trả ra gì cả. 
Validator.isRequire = function(selector){
    return {
        selector: selector,
        test: function (value){
            return value ? undefined: 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function(selector){
    return {
        selector: selector,
        test: function (value){
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined: 'Trường này phải là email'
        }
    }
}



Validator.minLenght = function(selector, min){
    return {
        selector: selector,
        test: function (value){
            return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`
        }
    }
}


Validator.isConfirmed = function(selector, getConfirmValue, messageError){
    return {
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : messageError || 'Giá trị không chính xác'
        }

    }

}


Validator({
    form: '#form',
    errorSelector: '.form-message',
    formGroupSelector: '.form-group',
    rules:[
        Validator.isRequire('#fullname'),
        Validator.isRequire('#email'),
        Validator.isRequire('#password'),
        Validator.isRequire('input[name="gender"]'),
        Validator.isRequire('#avatar'),
        Validator.minLenght('#password', 6),
        Validator.isEmail('#email'),
        Validator.isConfirmed('#password-comfirm', function(){
            return document.querySelector('#form #password').value
        }, 'Mật khẩu nhập lại không chính xác'),

    ],
    onSubmit: function(data){
        console.log(data)
    }
})