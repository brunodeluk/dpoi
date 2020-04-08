class User {
    constructor({
        id,
        name,
        lastname,
        email,
        phone,
        street,
        state,
        zipCode,
        birthDate,
        marrital,
        profilePic, // me la juego a que es una url
        comment
    }) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.street = street;
        this.state = state;
        this.zipCode = zipCode;
        this.birthDate = birthDate;
        this.marrital = marrital;
        this.profilePic = profilePic;
        this.comment = comment;    }
}