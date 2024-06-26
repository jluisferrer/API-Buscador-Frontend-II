const root = "http://localhost:4001/api/";

export const LoginUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }
    try {
        const response = await fetch(`${root}auth/login`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error
    }
}

export const RegisterUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${root}auth/register`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw new Error('Register failed: ' + error.message);
    }
};

export const GetProfile = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(`${root}users/profile`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const UpdateProfile = async (token, user) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    };
    try {
        const response = await fetch(`${root}users/profile`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        if (!responseData.success) {
            throw new Error(responseData.message);
        }
        return responseData;
    } catch (error) {
        throw new Error('Update profile failed: ' + error.message);
    }
};

export const GetUsers = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(`${root}users`, options);
        if (!response.ok) {
            console.log("response failed:", response);
            throw new Error('Network response was not ok');
        }
        console.log(111, "response", response);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw new Error('Get users failed: ' + error.message);
    }
};

export const DeleteUser = async (token, _id) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}users/${_id}`, options)
        if (!response.ok) {
            throw new Error('Failed to delete user: ' + response.statusText);
        }
        const data = await response.json();
        if (!data.success) {
            throw new Error('Failed to delete user: ' + data.message);
        }
        return data;
    } catch (error) {
        throw new Error('Delete user failed: ' + error.message);
    }
}

export const GetPosts = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        const response = await fetch(`${root}posts`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const GetUserPosts = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(`${root}posts/own`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const CreatePost = async (token, post) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(post),
    };
    try {
        const response = await fetch(`${root}posts`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw new Error('Cant create post ' + error.message);
    }
};

export const DeletePost = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}posts/${id}`, options)
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        throw new Error('Cant delete post ' + error.message);
    }
}

export const UpdatePost = async (id, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}posts/update/${id}`, options)
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        throw new Error('Cant update post ' + error.message);
    }
}

export const LikePost = async (token, id) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",  
            "Authorization": `Bearer ${token}`        
        }
    } 
    try {
        const response = await fetch(`${root}posts/like/${id}`, options)
  
        const data = await response.json();
  
        if (!data.success) {
            throw new Error(data.message)
        }
  
        return data
  
    } catch (error) {
        throw new Error('Cant likeunlike post ' + error.message);
    }
  }

  export const GetPostsById = async (id, token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}posts/${id}`, options)
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        throw new Error('Cant get posts ' + error.message);
    }
}
  