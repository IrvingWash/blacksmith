import { RequestMetainfo } from '@utils/request-metainfo';

export interface IRequestsEnvironment {
	authRequestMetainfo(callbackUrl: string): RequestMetainfo;
	authGetSessionRequestMetainfo(authenticationToken: string): RequestMetainfo;
}
