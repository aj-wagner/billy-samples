export interface AuthorizeBody {
  username: string;
  password: string;
  rememberMe: '1' | '0';
}
