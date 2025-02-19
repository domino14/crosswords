// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: proto/config_service/config_service.proto

package config_serviceconnect

import (
	connect "connectrpc.com/connect"
	context "context"
	errors "errors"
	config_service "github.com/woogles-io/liwords/rpc/api/proto/config_service"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect.IsAtLeastVersion1_13_0

const (
	// ConfigServiceName is the fully-qualified name of the ConfigService service.
	ConfigServiceName = "config_service.ConfigService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// ConfigServiceSetGamesEnabledProcedure is the fully-qualified name of the ConfigService's
	// SetGamesEnabled RPC.
	ConfigServiceSetGamesEnabledProcedure = "/config_service.ConfigService/SetGamesEnabled"
	// ConfigServiceSetFEHashProcedure is the fully-qualified name of the ConfigService's SetFEHash RPC.
	ConfigServiceSetFEHashProcedure = "/config_service.ConfigService/SetFEHash"
	// ConfigServiceSetAnnouncementsProcedure is the fully-qualified name of the ConfigService's
	// SetAnnouncements RPC.
	ConfigServiceSetAnnouncementsProcedure = "/config_service.ConfigService/SetAnnouncements"
	// ConfigServiceGetAnnouncementsProcedure is the fully-qualified name of the ConfigService's
	// GetAnnouncements RPC.
	ConfigServiceGetAnnouncementsProcedure = "/config_service.ConfigService/GetAnnouncements"
	// ConfigServiceSetSingleAnnouncementProcedure is the fully-qualified name of the ConfigService's
	// SetSingleAnnouncement RPC.
	ConfigServiceSetSingleAnnouncementProcedure = "/config_service.ConfigService/SetSingleAnnouncement"
	// ConfigServiceSetGlobalIntegrationProcedure is the fully-qualified name of the ConfigService's
	// SetGlobalIntegration RPC.
	ConfigServiceSetGlobalIntegrationProcedure = "/config_service.ConfigService/SetGlobalIntegration"
	// ConfigServiceAddBadgeProcedure is the fully-qualified name of the ConfigService's AddBadge RPC.
	ConfigServiceAddBadgeProcedure = "/config_service.ConfigService/AddBadge"
	// ConfigServiceAssignBadgeProcedure is the fully-qualified name of the ConfigService's AssignBadge
	// RPC.
	ConfigServiceAssignBadgeProcedure = "/config_service.ConfigService/AssignBadge"
	// ConfigServiceUnassignBadgeProcedure is the fully-qualified name of the ConfigService's
	// UnassignBadge RPC.
	ConfigServiceUnassignBadgeProcedure = "/config_service.ConfigService/UnassignBadge"
	// ConfigServiceGetUsersForBadgeProcedure is the fully-qualified name of the ConfigService's
	// GetUsersForBadge RPC.
	ConfigServiceGetUsersForBadgeProcedure = "/config_service.ConfigService/GetUsersForBadge"
	// ConfigServiceGetUserDetailsProcedure is the fully-qualified name of the ConfigService's
	// GetUserDetails RPC.
	ConfigServiceGetUserDetailsProcedure = "/config_service.ConfigService/GetUserDetails"
	// ConfigServiceSearchEmailProcedure is the fully-qualified name of the ConfigService's SearchEmail
	// RPC.
	ConfigServiceSearchEmailProcedure = "/config_service.ConfigService/SearchEmail"
)

// ConfigServiceClient is a client for the config_service.ConfigService service.
type ConfigServiceClient interface {
	SetGamesEnabled(context.Context, *connect.Request[config_service.EnableGamesRequest]) (*connect.Response[config_service.ConfigResponse], error)
	SetFEHash(context.Context, *connect.Request[config_service.SetFEHashRequest]) (*connect.Response[config_service.ConfigResponse], error)
	SetAnnouncements(context.Context, *connect.Request[config_service.SetAnnouncementsRequest]) (*connect.Response[config_service.ConfigResponse], error)
	GetAnnouncements(context.Context, *connect.Request[config_service.GetAnnouncementsRequest]) (*connect.Response[config_service.AnnouncementsResponse], error)
	SetSingleAnnouncement(context.Context, *connect.Request[config_service.SetSingleAnnouncementRequest]) (*connect.Response[config_service.ConfigResponse], error)
	SetGlobalIntegration(context.Context, *connect.Request[config_service.SetGlobalIntegrationRequest]) (*connect.Response[config_service.ConfigResponse], error)
	AddBadge(context.Context, *connect.Request[config_service.AddBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error)
	AssignBadge(context.Context, *connect.Request[config_service.AssignBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error)
	UnassignBadge(context.Context, *connect.Request[config_service.AssignBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error)
	GetUsersForBadge(context.Context, *connect.Request[config_service.GetUsersForBadgeRequest]) (*connect.Response[config_service.Usernames], error)
	GetUserDetails(context.Context, *connect.Request[config_service.GetUserDetailsRequest]) (*connect.Response[config_service.UserDetailsResponse], error)
	SearchEmail(context.Context, *connect.Request[config_service.SearchEmailRequest]) (*connect.Response[config_service.SearchEmailResponse], error)
}

// NewConfigServiceClient constructs a client for the config_service.ConfigService service. By
// default, it uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses,
// and sends uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the
// connect.WithGRPC() or connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewConfigServiceClient(httpClient connect.HTTPClient, baseURL string, opts ...connect.ClientOption) ConfigServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	configServiceMethods := config_service.File_proto_config_service_config_service_proto.Services().ByName("ConfigService").Methods()
	return &configServiceClient{
		setGamesEnabled: connect.NewClient[config_service.EnableGamesRequest, config_service.ConfigResponse](
			httpClient,
			baseURL+ConfigServiceSetGamesEnabledProcedure,
			connect.WithSchema(configServiceMethods.ByName("SetGamesEnabled")),
			connect.WithClientOptions(opts...),
		),
		setFEHash: connect.NewClient[config_service.SetFEHashRequest, config_service.ConfigResponse](
			httpClient,
			baseURL+ConfigServiceSetFEHashProcedure,
			connect.WithSchema(configServiceMethods.ByName("SetFEHash")),
			connect.WithClientOptions(opts...),
		),
		setAnnouncements: connect.NewClient[config_service.SetAnnouncementsRequest, config_service.ConfigResponse](
			httpClient,
			baseURL+ConfigServiceSetAnnouncementsProcedure,
			connect.WithSchema(configServiceMethods.ByName("SetAnnouncements")),
			connect.WithClientOptions(opts...),
		),
		getAnnouncements: connect.NewClient[config_service.GetAnnouncementsRequest, config_service.AnnouncementsResponse](
			httpClient,
			baseURL+ConfigServiceGetAnnouncementsProcedure,
			connect.WithSchema(configServiceMethods.ByName("GetAnnouncements")),
			connect.WithIdempotency(connect.IdempotencyNoSideEffects),
			connect.WithClientOptions(opts...),
		),
		setSingleAnnouncement: connect.NewClient[config_service.SetSingleAnnouncementRequest, config_service.ConfigResponse](
			httpClient,
			baseURL+ConfigServiceSetSingleAnnouncementProcedure,
			connect.WithSchema(configServiceMethods.ByName("SetSingleAnnouncement")),
			connect.WithClientOptions(opts...),
		),
		setGlobalIntegration: connect.NewClient[config_service.SetGlobalIntegrationRequest, config_service.ConfigResponse](
			httpClient,
			baseURL+ConfigServiceSetGlobalIntegrationProcedure,
			connect.WithSchema(configServiceMethods.ByName("SetGlobalIntegration")),
			connect.WithClientOptions(opts...),
		),
		addBadge: connect.NewClient[config_service.AddBadgeRequest, config_service.ConfigResponse](
			httpClient,
			baseURL+ConfigServiceAddBadgeProcedure,
			connect.WithSchema(configServiceMethods.ByName("AddBadge")),
			connect.WithClientOptions(opts...),
		),
		assignBadge: connect.NewClient[config_service.AssignBadgeRequest, config_service.ConfigResponse](
			httpClient,
			baseURL+ConfigServiceAssignBadgeProcedure,
			connect.WithSchema(configServiceMethods.ByName("AssignBadge")),
			connect.WithClientOptions(opts...),
		),
		unassignBadge: connect.NewClient[config_service.AssignBadgeRequest, config_service.ConfigResponse](
			httpClient,
			baseURL+ConfigServiceUnassignBadgeProcedure,
			connect.WithSchema(configServiceMethods.ByName("UnassignBadge")),
			connect.WithClientOptions(opts...),
		),
		getUsersForBadge: connect.NewClient[config_service.GetUsersForBadgeRequest, config_service.Usernames](
			httpClient,
			baseURL+ConfigServiceGetUsersForBadgeProcedure,
			connect.WithSchema(configServiceMethods.ByName("GetUsersForBadge")),
			connect.WithIdempotency(connect.IdempotencyNoSideEffects),
			connect.WithClientOptions(opts...),
		),
		getUserDetails: connect.NewClient[config_service.GetUserDetailsRequest, config_service.UserDetailsResponse](
			httpClient,
			baseURL+ConfigServiceGetUserDetailsProcedure,
			connect.WithSchema(configServiceMethods.ByName("GetUserDetails")),
			connect.WithIdempotency(connect.IdempotencyNoSideEffects),
			connect.WithClientOptions(opts...),
		),
		searchEmail: connect.NewClient[config_service.SearchEmailRequest, config_service.SearchEmailResponse](
			httpClient,
			baseURL+ConfigServiceSearchEmailProcedure,
			connect.WithSchema(configServiceMethods.ByName("SearchEmail")),
			connect.WithIdempotency(connect.IdempotencyNoSideEffects),
			connect.WithClientOptions(opts...),
		),
	}
}

// configServiceClient implements ConfigServiceClient.
type configServiceClient struct {
	setGamesEnabled       *connect.Client[config_service.EnableGamesRequest, config_service.ConfigResponse]
	setFEHash             *connect.Client[config_service.SetFEHashRequest, config_service.ConfigResponse]
	setAnnouncements      *connect.Client[config_service.SetAnnouncementsRequest, config_service.ConfigResponse]
	getAnnouncements      *connect.Client[config_service.GetAnnouncementsRequest, config_service.AnnouncementsResponse]
	setSingleAnnouncement *connect.Client[config_service.SetSingleAnnouncementRequest, config_service.ConfigResponse]
	setGlobalIntegration  *connect.Client[config_service.SetGlobalIntegrationRequest, config_service.ConfigResponse]
	addBadge              *connect.Client[config_service.AddBadgeRequest, config_service.ConfigResponse]
	assignBadge           *connect.Client[config_service.AssignBadgeRequest, config_service.ConfigResponse]
	unassignBadge         *connect.Client[config_service.AssignBadgeRequest, config_service.ConfigResponse]
	getUsersForBadge      *connect.Client[config_service.GetUsersForBadgeRequest, config_service.Usernames]
	getUserDetails        *connect.Client[config_service.GetUserDetailsRequest, config_service.UserDetailsResponse]
	searchEmail           *connect.Client[config_service.SearchEmailRequest, config_service.SearchEmailResponse]
}

// SetGamesEnabled calls config_service.ConfigService.SetGamesEnabled.
func (c *configServiceClient) SetGamesEnabled(ctx context.Context, req *connect.Request[config_service.EnableGamesRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return c.setGamesEnabled.CallUnary(ctx, req)
}

// SetFEHash calls config_service.ConfigService.SetFEHash.
func (c *configServiceClient) SetFEHash(ctx context.Context, req *connect.Request[config_service.SetFEHashRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return c.setFEHash.CallUnary(ctx, req)
}

// SetAnnouncements calls config_service.ConfigService.SetAnnouncements.
func (c *configServiceClient) SetAnnouncements(ctx context.Context, req *connect.Request[config_service.SetAnnouncementsRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return c.setAnnouncements.CallUnary(ctx, req)
}

// GetAnnouncements calls config_service.ConfigService.GetAnnouncements.
func (c *configServiceClient) GetAnnouncements(ctx context.Context, req *connect.Request[config_service.GetAnnouncementsRequest]) (*connect.Response[config_service.AnnouncementsResponse], error) {
	return c.getAnnouncements.CallUnary(ctx, req)
}

// SetSingleAnnouncement calls config_service.ConfigService.SetSingleAnnouncement.
func (c *configServiceClient) SetSingleAnnouncement(ctx context.Context, req *connect.Request[config_service.SetSingleAnnouncementRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return c.setSingleAnnouncement.CallUnary(ctx, req)
}

// SetGlobalIntegration calls config_service.ConfigService.SetGlobalIntegration.
func (c *configServiceClient) SetGlobalIntegration(ctx context.Context, req *connect.Request[config_service.SetGlobalIntegrationRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return c.setGlobalIntegration.CallUnary(ctx, req)
}

// AddBadge calls config_service.ConfigService.AddBadge.
func (c *configServiceClient) AddBadge(ctx context.Context, req *connect.Request[config_service.AddBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return c.addBadge.CallUnary(ctx, req)
}

// AssignBadge calls config_service.ConfigService.AssignBadge.
func (c *configServiceClient) AssignBadge(ctx context.Context, req *connect.Request[config_service.AssignBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return c.assignBadge.CallUnary(ctx, req)
}

// UnassignBadge calls config_service.ConfigService.UnassignBadge.
func (c *configServiceClient) UnassignBadge(ctx context.Context, req *connect.Request[config_service.AssignBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return c.unassignBadge.CallUnary(ctx, req)
}

// GetUsersForBadge calls config_service.ConfigService.GetUsersForBadge.
func (c *configServiceClient) GetUsersForBadge(ctx context.Context, req *connect.Request[config_service.GetUsersForBadgeRequest]) (*connect.Response[config_service.Usernames], error) {
	return c.getUsersForBadge.CallUnary(ctx, req)
}

// GetUserDetails calls config_service.ConfigService.GetUserDetails.
func (c *configServiceClient) GetUserDetails(ctx context.Context, req *connect.Request[config_service.GetUserDetailsRequest]) (*connect.Response[config_service.UserDetailsResponse], error) {
	return c.getUserDetails.CallUnary(ctx, req)
}

// SearchEmail calls config_service.ConfigService.SearchEmail.
func (c *configServiceClient) SearchEmail(ctx context.Context, req *connect.Request[config_service.SearchEmailRequest]) (*connect.Response[config_service.SearchEmailResponse], error) {
	return c.searchEmail.CallUnary(ctx, req)
}

// ConfigServiceHandler is an implementation of the config_service.ConfigService service.
type ConfigServiceHandler interface {
	SetGamesEnabled(context.Context, *connect.Request[config_service.EnableGamesRequest]) (*connect.Response[config_service.ConfigResponse], error)
	SetFEHash(context.Context, *connect.Request[config_service.SetFEHashRequest]) (*connect.Response[config_service.ConfigResponse], error)
	SetAnnouncements(context.Context, *connect.Request[config_service.SetAnnouncementsRequest]) (*connect.Response[config_service.ConfigResponse], error)
	GetAnnouncements(context.Context, *connect.Request[config_service.GetAnnouncementsRequest]) (*connect.Response[config_service.AnnouncementsResponse], error)
	SetSingleAnnouncement(context.Context, *connect.Request[config_service.SetSingleAnnouncementRequest]) (*connect.Response[config_service.ConfigResponse], error)
	SetGlobalIntegration(context.Context, *connect.Request[config_service.SetGlobalIntegrationRequest]) (*connect.Response[config_service.ConfigResponse], error)
	AddBadge(context.Context, *connect.Request[config_service.AddBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error)
	AssignBadge(context.Context, *connect.Request[config_service.AssignBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error)
	UnassignBadge(context.Context, *connect.Request[config_service.AssignBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error)
	GetUsersForBadge(context.Context, *connect.Request[config_service.GetUsersForBadgeRequest]) (*connect.Response[config_service.Usernames], error)
	GetUserDetails(context.Context, *connect.Request[config_service.GetUserDetailsRequest]) (*connect.Response[config_service.UserDetailsResponse], error)
	SearchEmail(context.Context, *connect.Request[config_service.SearchEmailRequest]) (*connect.Response[config_service.SearchEmailResponse], error)
}

// NewConfigServiceHandler builds an HTTP handler from the service implementation. It returns the
// path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewConfigServiceHandler(svc ConfigServiceHandler, opts ...connect.HandlerOption) (string, http.Handler) {
	configServiceMethods := config_service.File_proto_config_service_config_service_proto.Services().ByName("ConfigService").Methods()
	configServiceSetGamesEnabledHandler := connect.NewUnaryHandler(
		ConfigServiceSetGamesEnabledProcedure,
		svc.SetGamesEnabled,
		connect.WithSchema(configServiceMethods.ByName("SetGamesEnabled")),
		connect.WithHandlerOptions(opts...),
	)
	configServiceSetFEHashHandler := connect.NewUnaryHandler(
		ConfigServiceSetFEHashProcedure,
		svc.SetFEHash,
		connect.WithSchema(configServiceMethods.ByName("SetFEHash")),
		connect.WithHandlerOptions(opts...),
	)
	configServiceSetAnnouncementsHandler := connect.NewUnaryHandler(
		ConfigServiceSetAnnouncementsProcedure,
		svc.SetAnnouncements,
		connect.WithSchema(configServiceMethods.ByName("SetAnnouncements")),
		connect.WithHandlerOptions(opts...),
	)
	configServiceGetAnnouncementsHandler := connect.NewUnaryHandler(
		ConfigServiceGetAnnouncementsProcedure,
		svc.GetAnnouncements,
		connect.WithSchema(configServiceMethods.ByName("GetAnnouncements")),
		connect.WithIdempotency(connect.IdempotencyNoSideEffects),
		connect.WithHandlerOptions(opts...),
	)
	configServiceSetSingleAnnouncementHandler := connect.NewUnaryHandler(
		ConfigServiceSetSingleAnnouncementProcedure,
		svc.SetSingleAnnouncement,
		connect.WithSchema(configServiceMethods.ByName("SetSingleAnnouncement")),
		connect.WithHandlerOptions(opts...),
	)
	configServiceSetGlobalIntegrationHandler := connect.NewUnaryHandler(
		ConfigServiceSetGlobalIntegrationProcedure,
		svc.SetGlobalIntegration,
		connect.WithSchema(configServiceMethods.ByName("SetGlobalIntegration")),
		connect.WithHandlerOptions(opts...),
	)
	configServiceAddBadgeHandler := connect.NewUnaryHandler(
		ConfigServiceAddBadgeProcedure,
		svc.AddBadge,
		connect.WithSchema(configServiceMethods.ByName("AddBadge")),
		connect.WithHandlerOptions(opts...),
	)
	configServiceAssignBadgeHandler := connect.NewUnaryHandler(
		ConfigServiceAssignBadgeProcedure,
		svc.AssignBadge,
		connect.WithSchema(configServiceMethods.ByName("AssignBadge")),
		connect.WithHandlerOptions(opts...),
	)
	configServiceUnassignBadgeHandler := connect.NewUnaryHandler(
		ConfigServiceUnassignBadgeProcedure,
		svc.UnassignBadge,
		connect.WithSchema(configServiceMethods.ByName("UnassignBadge")),
		connect.WithHandlerOptions(opts...),
	)
	configServiceGetUsersForBadgeHandler := connect.NewUnaryHandler(
		ConfigServiceGetUsersForBadgeProcedure,
		svc.GetUsersForBadge,
		connect.WithSchema(configServiceMethods.ByName("GetUsersForBadge")),
		connect.WithIdempotency(connect.IdempotencyNoSideEffects),
		connect.WithHandlerOptions(opts...),
	)
	configServiceGetUserDetailsHandler := connect.NewUnaryHandler(
		ConfigServiceGetUserDetailsProcedure,
		svc.GetUserDetails,
		connect.WithSchema(configServiceMethods.ByName("GetUserDetails")),
		connect.WithIdempotency(connect.IdempotencyNoSideEffects),
		connect.WithHandlerOptions(opts...),
	)
	configServiceSearchEmailHandler := connect.NewUnaryHandler(
		ConfigServiceSearchEmailProcedure,
		svc.SearchEmail,
		connect.WithSchema(configServiceMethods.ByName("SearchEmail")),
		connect.WithIdempotency(connect.IdempotencyNoSideEffects),
		connect.WithHandlerOptions(opts...),
	)
	return "/config_service.ConfigService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case ConfigServiceSetGamesEnabledProcedure:
			configServiceSetGamesEnabledHandler.ServeHTTP(w, r)
		case ConfigServiceSetFEHashProcedure:
			configServiceSetFEHashHandler.ServeHTTP(w, r)
		case ConfigServiceSetAnnouncementsProcedure:
			configServiceSetAnnouncementsHandler.ServeHTTP(w, r)
		case ConfigServiceGetAnnouncementsProcedure:
			configServiceGetAnnouncementsHandler.ServeHTTP(w, r)
		case ConfigServiceSetSingleAnnouncementProcedure:
			configServiceSetSingleAnnouncementHandler.ServeHTTP(w, r)
		case ConfigServiceSetGlobalIntegrationProcedure:
			configServiceSetGlobalIntegrationHandler.ServeHTTP(w, r)
		case ConfigServiceAddBadgeProcedure:
			configServiceAddBadgeHandler.ServeHTTP(w, r)
		case ConfigServiceAssignBadgeProcedure:
			configServiceAssignBadgeHandler.ServeHTTP(w, r)
		case ConfigServiceUnassignBadgeProcedure:
			configServiceUnassignBadgeHandler.ServeHTTP(w, r)
		case ConfigServiceGetUsersForBadgeProcedure:
			configServiceGetUsersForBadgeHandler.ServeHTTP(w, r)
		case ConfigServiceGetUserDetailsProcedure:
			configServiceGetUserDetailsHandler.ServeHTTP(w, r)
		case ConfigServiceSearchEmailProcedure:
			configServiceSearchEmailHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedConfigServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedConfigServiceHandler struct{}

func (UnimplementedConfigServiceHandler) SetGamesEnabled(context.Context, *connect.Request[config_service.EnableGamesRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.SetGamesEnabled is not implemented"))
}

func (UnimplementedConfigServiceHandler) SetFEHash(context.Context, *connect.Request[config_service.SetFEHashRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.SetFEHash is not implemented"))
}

func (UnimplementedConfigServiceHandler) SetAnnouncements(context.Context, *connect.Request[config_service.SetAnnouncementsRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.SetAnnouncements is not implemented"))
}

func (UnimplementedConfigServiceHandler) GetAnnouncements(context.Context, *connect.Request[config_service.GetAnnouncementsRequest]) (*connect.Response[config_service.AnnouncementsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.GetAnnouncements is not implemented"))
}

func (UnimplementedConfigServiceHandler) SetSingleAnnouncement(context.Context, *connect.Request[config_service.SetSingleAnnouncementRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.SetSingleAnnouncement is not implemented"))
}

func (UnimplementedConfigServiceHandler) SetGlobalIntegration(context.Context, *connect.Request[config_service.SetGlobalIntegrationRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.SetGlobalIntegration is not implemented"))
}

func (UnimplementedConfigServiceHandler) AddBadge(context.Context, *connect.Request[config_service.AddBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.AddBadge is not implemented"))
}

func (UnimplementedConfigServiceHandler) AssignBadge(context.Context, *connect.Request[config_service.AssignBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.AssignBadge is not implemented"))
}

func (UnimplementedConfigServiceHandler) UnassignBadge(context.Context, *connect.Request[config_service.AssignBadgeRequest]) (*connect.Response[config_service.ConfigResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.UnassignBadge is not implemented"))
}

func (UnimplementedConfigServiceHandler) GetUsersForBadge(context.Context, *connect.Request[config_service.GetUsersForBadgeRequest]) (*connect.Response[config_service.Usernames], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.GetUsersForBadge is not implemented"))
}

func (UnimplementedConfigServiceHandler) GetUserDetails(context.Context, *connect.Request[config_service.GetUserDetailsRequest]) (*connect.Response[config_service.UserDetailsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.GetUserDetails is not implemented"))
}

func (UnimplementedConfigServiceHandler) SearchEmail(context.Context, *connect.Request[config_service.SearchEmailRequest]) (*connect.Response[config_service.SearchEmailResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("config_service.ConfigService.SearchEmail is not implemented"))
}
