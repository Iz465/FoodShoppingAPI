namespace FoodShoppingAPI.Enums
{
    public enum ERole
    {
        None,
        Member,
        Admin
    }

    public enum EAuthentication
    {
        UserNotFound,
        UserExists,
        PasswordNotFound,
        PasswordNotMatching,
        Success
    }

}
