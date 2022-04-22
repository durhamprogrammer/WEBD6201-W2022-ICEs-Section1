import http from '../http-common';
import IContactData from '../models/Contact';
import AuthHeader from './AuthHeader';
class ContactListDataService
{
    create(data: IContactData)
    {
        return http.post<IContactData>("/add", data, AuthHeader());
    }

    readAll()
    {
        return http.get<Array<IContactData>>("/contact-list", AuthHeader());
    }

    readOne(id: any)
    {
        return http.get<IContactData>(`/edit/${id}`, AuthHeader());
    }

    update(data: IContactData, id: any)
    {
        return http.post<IContactData>(`/edit/${id}`, data, AuthHeader());
    }

    delete(id: any)
    {
        return http.get<IContactData>(`/delete/${id}`, AuthHeader());
    }
}

export default new ContactListDataService();