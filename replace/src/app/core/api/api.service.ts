import {Injectable} from '@angular/core';

import {Http, Response, Headers} from '@angular/http';

import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {UiSnackbar} from 'ng-smn-ui';

interface config {
    SMNAuthApiRoutes: string,
    headers?: {}
}
let API: {};
let config: config;

@Injectable()
export class ApiService {
    constructor(private http: Http) {
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        let body: any;
        if (error instanceof Response) {
            body = error.json() || '';

            switch (error.status) {
                case 0:
                    UiSnackbar.show({
                        text: 'Um de nossos serviços está fora do ar e não foi possível processar sua requisição. ' +
                        'Tente novamente mais tarde.',
                        actionText: 'OK',
                        action: close => close(),
                        duration: Infinity
                    });
                    break;
                case 400:
                    UiSnackbar.show({
                        text: 'Requisição inválida. Verifique as informações fornecidas.',
                        actionText: 'OK',
                        duration: Infinity,
                        action: close => close()
                    });
                    break;
                case 500:
                    UiSnackbar.show({
                        text: 'Ocorreu um erro interno. Já fomos informados do erro. Tente novamente mais tarde.',
                        actionText: 'OK',
                        duration: Infinity,
                        action: close => close()
                    });
            }
        } else {
            UiSnackbar.show({
                text: 'Aconteceu um erro desconhecido. Tente novamente mais tarde.',
                actionText: 'OK',
                action: close => close(),
                duration: Infinity
            });
        }
        return Observable.throw(body);
    }

    private getRoutes(): Observable<any> {
        return this.http.get(config.SMNAuthApiRoutes)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public init(newConfig: config): Promise<any> {
        config = newConfig;

        return new Promise((resolve) => {
            this.getRoutes()
                .subscribe(
                    body => {
                        API = body.content;
                        resolve(body.content);
                    }
                );
        });
    }

    private _call(metodo: any): Function {
        return (data: {}) => {
            const method = metodo.method.toLowerCase();
            let url = metodo.url;

            // url = url.replace('desenv.smn.com.br', '192.168.10.200'); // Ítalo

            const headers = new Headers();
            const setHeaders = config.headers;
            if (setHeaders) {
                Object.keys(setHeaders).forEach((key) => {
                    headers.append(key, setHeaders[key]);
                });
            }

            let secondParam = data;
            let thirdParam = {
                headers
            };

            if (data) {
                const urlParams = jsonToParams(url, data);
                url = urlParams.url;
                data = urlParams.data;
            }

            if (method === 'get' || method === 'delete') {
                if (data) {
                    url = url + jsonToQueryString(data);
                }
                secondParam = thirdParam;
                thirdParam = undefined;
            }

            const http = this.http[method](url, secondParam, thirdParam)
                .map(this.extractData)
                .catch(this.handleError);

            return {
                subscribe: (pNext, pError?, pFinally?) => {
                    return http.finally(pFinally).subscribe(pNext, pError);
                }
            }
        }
    }

    public prep(funcionalidade: string, metodo: string) {
        if (!API[funcionalidade][metodo]) {
            console.error('Método não existe', metodo);
            return () => {
            };
        }

        return {
            call: this._call(API[funcionalidade][metodo])
        }
    }
}

function jsonToQueryString(json) {
    const params = Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    });
    return (params.length ? '?' : '') + params.join('&');
}

function jsonToParams(url, data) {
    const dataClone = Object.assign({}, data);
    Object.keys(dataClone).forEach((key) => {
        if (url.includes(':' + key)) {
            url = url.replace(':' + key, dataClone[key]);
            delete dataClone[key];
        }
    });

    return {
        url: url,
        data: dataClone
    };
}
