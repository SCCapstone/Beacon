var PasswordValidator = /** @class */ (function () {
    function PasswordValidator() {
    }
    PasswordValidator.passwordsMatch = function (control) {
        if (control.value == control.root.value['password']) {
            console.log('passwords match');
            return null;
        }
        else {
            return { isValid: true };
        }
    };
    return PasswordValidator;
}());
export { PasswordValidator };
//# sourceMappingURL=password.js.map