// Definitions for pairing messages

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.34.1
// 	protoc        (unknown)
// source: proto/ipc/pair.proto

package ipc

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type PairMethod int32

const (
	PairMethod_COP PairMethod = 0
)

// Enum value maps for PairMethod.
var (
	PairMethod_name = map[int32]string{
		0: "COP",
	}
	PairMethod_value = map[string]int32{
		"COP": 0,
	}
)

func (x PairMethod) Enum() *PairMethod {
	p := new(PairMethod)
	*p = x
	return p
}

func (x PairMethod) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (PairMethod) Descriptor() protoreflect.EnumDescriptor {
	return file_proto_ipc_pair_proto_enumTypes[0].Descriptor()
}

func (PairMethod) Type() protoreflect.EnumType {
	return &file_proto_ipc_pair_proto_enumTypes[0]
}

func (x PairMethod) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use PairMethod.Descriptor instead.
func (PairMethod) EnumDescriptor() ([]byte, []int) {
	return file_proto_ipc_pair_proto_rawDescGZIP(), []int{0}
}

type PairError int32

const (
	PairError_SUCCESS                        PairError = 0
	PairError_PLAYER_COUNT_INSUFFICIENT      PairError = 1
	PairError_ROUND_COUNT_INSUFFICIENT       PairError = 2
	PairError_PLAYER_COUNT_TOO_LARGE         PairError = 3
	PairError_PLAYER_NAME_COUNT_INSUFFICIENT PairError = 4
	PairError_PLAYER_NAME_EMPTY              PairError = 5
	PairError_MORE_PAIRINGS_THAN_ROUNDS      PairError = 6
	PairError_ALL_ROUNDS_PAIRED              PairError = 7
	PairError_INVALID_ROUND_PAIRINGS_COUNT   PairError = 8
	PairError_PLAYER_INDEX_OUT_OF_BOUNDS     PairError = 9
	PairError_UNPAIRED_PLAYER                PairError = 10
	PairError_INVALID_PAIRING                PairError = 11
	PairError_MORE_RESULTS_THAN_ROUNDS       PairError = 12
	PairError_MORE_RESULTS_THAN_PAIRINGS     PairError = 13
	PairError_INVALID_ROUND_RESULTS_COUNT    PairError = 14
	PairError_INVALID_PLAYER_CLASS_COUNT     PairError = 15
	PairError_INVALID_PLAYER_CLASS           PairError = 16
	PairError_INVALID_CLASS_PRIZE            PairError = 17
	PairError_INVALID_GIBSON_SPREAD          PairError = 18
	PairError_INVALID_CONTROL_LOSS_THRESHOLD PairError = 19
	PairError_INVALID_HOPEFULNESS_THRESHOLD  PairError = 20
	PairError_INVALID_DIVISION_SIMS          PairError = 21
	PairError_INVALID_CONTROL_LOSS_SIMS      PairError = 22
	PairError_INVALID_PLACE_PRIZES           PairError = 23
	PairError_INVALID_REMOVED_PLAYER         PairError = 24
	PairError_INVALID_VALID_PLAYER_COUNT     PairError = 25
	PairError_MIN_WEIGHT_MATCHING            PairError = 26
	PairError_INVALID_PAIRINGS_LENGTH        PairError = 27
	PairError_OVERCONSTRAINED                PairError = 28
	PairError_REQUEST_TO_JSON_FAILED         PairError = 29
	PairError_TIMEOUT                        PairError = 30
)

// Enum value maps for PairError.
var (
	PairError_name = map[int32]string{
		0:  "SUCCESS",
		1:  "PLAYER_COUNT_INSUFFICIENT",
		2:  "ROUND_COUNT_INSUFFICIENT",
		3:  "PLAYER_COUNT_TOO_LARGE",
		4:  "PLAYER_NAME_COUNT_INSUFFICIENT",
		5:  "PLAYER_NAME_EMPTY",
		6:  "MORE_PAIRINGS_THAN_ROUNDS",
		7:  "ALL_ROUNDS_PAIRED",
		8:  "INVALID_ROUND_PAIRINGS_COUNT",
		9:  "PLAYER_INDEX_OUT_OF_BOUNDS",
		10: "UNPAIRED_PLAYER",
		11: "INVALID_PAIRING",
		12: "MORE_RESULTS_THAN_ROUNDS",
		13: "MORE_RESULTS_THAN_PAIRINGS",
		14: "INVALID_ROUND_RESULTS_COUNT",
		15: "INVALID_PLAYER_CLASS_COUNT",
		16: "INVALID_PLAYER_CLASS",
		17: "INVALID_CLASS_PRIZE",
		18: "INVALID_GIBSON_SPREAD",
		19: "INVALID_CONTROL_LOSS_THRESHOLD",
		20: "INVALID_HOPEFULNESS_THRESHOLD",
		21: "INVALID_DIVISION_SIMS",
		22: "INVALID_CONTROL_LOSS_SIMS",
		23: "INVALID_PLACE_PRIZES",
		24: "INVALID_REMOVED_PLAYER",
		25: "INVALID_VALID_PLAYER_COUNT",
		26: "MIN_WEIGHT_MATCHING",
		27: "INVALID_PAIRINGS_LENGTH",
		28: "OVERCONSTRAINED",
		29: "REQUEST_TO_JSON_FAILED",
		30: "TIMEOUT",
	}
	PairError_value = map[string]int32{
		"SUCCESS":                        0,
		"PLAYER_COUNT_INSUFFICIENT":      1,
		"ROUND_COUNT_INSUFFICIENT":       2,
		"PLAYER_COUNT_TOO_LARGE":         3,
		"PLAYER_NAME_COUNT_INSUFFICIENT": 4,
		"PLAYER_NAME_EMPTY":              5,
		"MORE_PAIRINGS_THAN_ROUNDS":      6,
		"ALL_ROUNDS_PAIRED":              7,
		"INVALID_ROUND_PAIRINGS_COUNT":   8,
		"PLAYER_INDEX_OUT_OF_BOUNDS":     9,
		"UNPAIRED_PLAYER":                10,
		"INVALID_PAIRING":                11,
		"MORE_RESULTS_THAN_ROUNDS":       12,
		"MORE_RESULTS_THAN_PAIRINGS":     13,
		"INVALID_ROUND_RESULTS_COUNT":    14,
		"INVALID_PLAYER_CLASS_COUNT":     15,
		"INVALID_PLAYER_CLASS":           16,
		"INVALID_CLASS_PRIZE":            17,
		"INVALID_GIBSON_SPREAD":          18,
		"INVALID_CONTROL_LOSS_THRESHOLD": 19,
		"INVALID_HOPEFULNESS_THRESHOLD":  20,
		"INVALID_DIVISION_SIMS":          21,
		"INVALID_CONTROL_LOSS_SIMS":      22,
		"INVALID_PLACE_PRIZES":           23,
		"INVALID_REMOVED_PLAYER":         24,
		"INVALID_VALID_PLAYER_COUNT":     25,
		"MIN_WEIGHT_MATCHING":            26,
		"INVALID_PAIRINGS_LENGTH":        27,
		"OVERCONSTRAINED":                28,
		"REQUEST_TO_JSON_FAILED":         29,
		"TIMEOUT":                        30,
	}
)

func (x PairError) Enum() *PairError {
	p := new(PairError)
	*p = x
	return p
}

func (x PairError) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (PairError) Descriptor() protoreflect.EnumDescriptor {
	return file_proto_ipc_pair_proto_enumTypes[1].Descriptor()
}

func (PairError) Type() protoreflect.EnumType {
	return &file_proto_ipc_pair_proto_enumTypes[1]
}

func (x PairError) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use PairError.Descriptor instead.
func (PairError) EnumDescriptor() ([]byte, []int) {
	return file_proto_ipc_pair_proto_rawDescGZIP(), []int{1}
}

type RoundPairings struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Pairings []int32 `protobuf:"varint,1,rep,packed,name=pairings,proto3" json:"pairings,omitempty"`
}

func (x *RoundPairings) Reset() {
	*x = RoundPairings{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_ipc_pair_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RoundPairings) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RoundPairings) ProtoMessage() {}

func (x *RoundPairings) ProtoReflect() protoreflect.Message {
	mi := &file_proto_ipc_pair_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RoundPairings.ProtoReflect.Descriptor instead.
func (*RoundPairings) Descriptor() ([]byte, []int) {
	return file_proto_ipc_pair_proto_rawDescGZIP(), []int{0}
}

func (x *RoundPairings) GetPairings() []int32 {
	if x != nil {
		return x.Pairings
	}
	return nil
}

type RoundResults struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Results []int32 `protobuf:"varint,1,rep,packed,name=results,proto3" json:"results,omitempty"`
}

func (x *RoundResults) Reset() {
	*x = RoundResults{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_ipc_pair_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RoundResults) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RoundResults) ProtoMessage() {}

func (x *RoundResults) ProtoReflect() protoreflect.Message {
	mi := &file_proto_ipc_pair_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RoundResults.ProtoReflect.Descriptor instead.
func (*RoundResults) Descriptor() ([]byte, []int) {
	return file_proto_ipc_pair_proto_rawDescGZIP(), []int{1}
}

func (x *RoundResults) GetResults() []int32 {
	if x != nil {
		return x.Results
	}
	return nil
}

type PairRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	PairMethod           PairMethod       `protobuf:"varint,1,opt,name=pair_method,json=pairMethod,proto3,enum=ipc.PairMethod" json:"pair_method,omitempty"`
	PlayerNames          []string         `protobuf:"bytes,2,rep,name=player_names,json=playerNames,proto3" json:"player_names,omitempty"`
	PlayerClasses        []int32          `protobuf:"varint,3,rep,packed,name=player_classes,json=playerClasses,proto3" json:"player_classes,omitempty"`
	DivisionPairings     []*RoundPairings `protobuf:"bytes,4,rep,name=division_pairings,json=divisionPairings,proto3" json:"division_pairings,omitempty"`
	DivisionResults      []*RoundResults  `protobuf:"bytes,5,rep,name=division_results,json=divisionResults,proto3" json:"division_results,omitempty"`
	ClassPrizes          []int32          `protobuf:"varint,6,rep,packed,name=class_prizes,json=classPrizes,proto3" json:"class_prizes,omitempty"`
	GibsonSpread         int32            `protobuf:"varint,7,opt,name=gibson_spread,json=gibsonSpread,proto3" json:"gibson_spread,omitempty"`
	ControlLossThreshold float64          `protobuf:"fixed64,8,opt,name=control_loss_threshold,json=controlLossThreshold,proto3" json:"control_loss_threshold,omitempty"`
	HopefulnessThreshold float64          `protobuf:"fixed64,9,opt,name=hopefulness_threshold,json=hopefulnessThreshold,proto3" json:"hopefulness_threshold,omitempty"`
	AllPlayers           int32            `protobuf:"varint,10,opt,name=all_players,json=allPlayers,proto3" json:"all_players,omitempty"`
	ValidPlayers         int32            `protobuf:"varint,11,opt,name=valid_players,json=validPlayers,proto3" json:"valid_players,omitempty"`
	Rounds               int32            `protobuf:"varint,12,opt,name=rounds,proto3" json:"rounds,omitempty"`
	PlacePrizes          int32            `protobuf:"varint,13,opt,name=place_prizes,json=placePrizes,proto3" json:"place_prizes,omitempty"`
	DivisionSims         int32            `protobuf:"varint,14,opt,name=division_sims,json=divisionSims,proto3" json:"division_sims,omitempty"`
	ControlLossSims      int32            `protobuf:"varint,15,opt,name=control_loss_sims,json=controlLossSims,proto3" json:"control_loss_sims,omitempty"`
	UseControlLoss       bool             `protobuf:"varint,16,opt,name=use_control_loss,json=useControlLoss,proto3" json:"use_control_loss,omitempty"`
	AllowRepeatByes      bool             `protobuf:"varint,17,opt,name=allow_repeat_byes,json=allowRepeatByes,proto3" json:"allow_repeat_byes,omitempty"`
	RemovedPlayers       []int32          `protobuf:"varint,18,rep,packed,name=removed_players,json=removedPlayers,proto3" json:"removed_players,omitempty"`
	Seed                 int64            `protobuf:"varint,19,opt,name=seed,proto3" json:"seed,omitempty"`
}

func (x *PairRequest) Reset() {
	*x = PairRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_ipc_pair_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PairRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PairRequest) ProtoMessage() {}

func (x *PairRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_ipc_pair_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PairRequest.ProtoReflect.Descriptor instead.
func (*PairRequest) Descriptor() ([]byte, []int) {
	return file_proto_ipc_pair_proto_rawDescGZIP(), []int{2}
}

func (x *PairRequest) GetPairMethod() PairMethod {
	if x != nil {
		return x.PairMethod
	}
	return PairMethod_COP
}

func (x *PairRequest) GetPlayerNames() []string {
	if x != nil {
		return x.PlayerNames
	}
	return nil
}

func (x *PairRequest) GetPlayerClasses() []int32 {
	if x != nil {
		return x.PlayerClasses
	}
	return nil
}

func (x *PairRequest) GetDivisionPairings() []*RoundPairings {
	if x != nil {
		return x.DivisionPairings
	}
	return nil
}

func (x *PairRequest) GetDivisionResults() []*RoundResults {
	if x != nil {
		return x.DivisionResults
	}
	return nil
}

func (x *PairRequest) GetClassPrizes() []int32 {
	if x != nil {
		return x.ClassPrizes
	}
	return nil
}

func (x *PairRequest) GetGibsonSpread() int32 {
	if x != nil {
		return x.GibsonSpread
	}
	return 0
}

func (x *PairRequest) GetControlLossThreshold() float64 {
	if x != nil {
		return x.ControlLossThreshold
	}
	return 0
}

func (x *PairRequest) GetHopefulnessThreshold() float64 {
	if x != nil {
		return x.HopefulnessThreshold
	}
	return 0
}

func (x *PairRequest) GetAllPlayers() int32 {
	if x != nil {
		return x.AllPlayers
	}
	return 0
}

func (x *PairRequest) GetValidPlayers() int32 {
	if x != nil {
		return x.ValidPlayers
	}
	return 0
}

func (x *PairRequest) GetRounds() int32 {
	if x != nil {
		return x.Rounds
	}
	return 0
}

func (x *PairRequest) GetPlacePrizes() int32 {
	if x != nil {
		return x.PlacePrizes
	}
	return 0
}

func (x *PairRequest) GetDivisionSims() int32 {
	if x != nil {
		return x.DivisionSims
	}
	return 0
}

func (x *PairRequest) GetControlLossSims() int32 {
	if x != nil {
		return x.ControlLossSims
	}
	return 0
}

func (x *PairRequest) GetUseControlLoss() bool {
	if x != nil {
		return x.UseControlLoss
	}
	return false
}

func (x *PairRequest) GetAllowRepeatByes() bool {
	if x != nil {
		return x.AllowRepeatByes
	}
	return false
}

func (x *PairRequest) GetRemovedPlayers() []int32 {
	if x != nil {
		return x.RemovedPlayers
	}
	return nil
}

func (x *PairRequest) GetSeed() int64 {
	if x != nil {
		return x.Seed
	}
	return 0
}

type PairResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ErrorCode    PairError `protobuf:"varint,1,opt,name=error_code,json=errorCode,proto3,enum=ipc.PairError" json:"error_code,omitempty"`
	ErrorMessage string    `protobuf:"bytes,2,opt,name=error_message,json=errorMessage,proto3" json:"error_message,omitempty"`
	Log          string    `protobuf:"bytes,3,opt,name=log,proto3" json:"log,omitempty"`
	Pairings     []int32   `protobuf:"varint,4,rep,packed,name=pairings,proto3" json:"pairings,omitempty"`
}

func (x *PairResponse) Reset() {
	*x = PairResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_ipc_pair_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PairResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PairResponse) ProtoMessage() {}

func (x *PairResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_ipc_pair_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PairResponse.ProtoReflect.Descriptor instead.
func (*PairResponse) Descriptor() ([]byte, []int) {
	return file_proto_ipc_pair_proto_rawDescGZIP(), []int{3}
}

func (x *PairResponse) GetErrorCode() PairError {
	if x != nil {
		return x.ErrorCode
	}
	return PairError_SUCCESS
}

func (x *PairResponse) GetErrorMessage() string {
	if x != nil {
		return x.ErrorMessage
	}
	return ""
}

func (x *PairResponse) GetLog() string {
	if x != nil {
		return x.Log
	}
	return ""
}

func (x *PairResponse) GetPairings() []int32 {
	if x != nil {
		return x.Pairings
	}
	return nil
}

var File_proto_ipc_pair_proto protoreflect.FileDescriptor

var file_proto_ipc_pair_proto_rawDesc = []byte{
	0x0a, 0x14, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x70, 0x63, 0x2f, 0x70, 0x61, 0x69, 0x72,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x03, 0x69, 0x70, 0x63, 0x22, 0x2b, 0x0a, 0x0d, 0x52,
	0x6f, 0x75, 0x6e, 0x64, 0x50, 0x61, 0x69, 0x72, 0x69, 0x6e, 0x67, 0x73, 0x12, 0x1a, 0x0a, 0x08,
	0x70, 0x61, 0x69, 0x72, 0x69, 0x6e, 0x67, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x05, 0x52, 0x08,
	0x70, 0x61, 0x69, 0x72, 0x69, 0x6e, 0x67, 0x73, 0x22, 0x28, 0x0a, 0x0c, 0x52, 0x6f, 0x75, 0x6e,
	0x64, 0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x73, 0x12, 0x18, 0x0a, 0x07, 0x72, 0x65, 0x73, 0x75,
	0x6c, 0x74, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x05, 0x52, 0x07, 0x72, 0x65, 0x73, 0x75, 0x6c,
	0x74, 0x73, 0x22, 0xa0, 0x06, 0x0a, 0x0b, 0x50, 0x61, 0x69, 0x72, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x12, 0x30, 0x0a, 0x0b, 0x70, 0x61, 0x69, 0x72, 0x5f, 0x6d, 0x65, 0x74, 0x68, 0x6f,
	0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x0f, 0x2e, 0x69, 0x70, 0x63, 0x2e, 0x50, 0x61,
	0x69, 0x72, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x52, 0x0a, 0x70, 0x61, 0x69, 0x72, 0x4d, 0x65,
	0x74, 0x68, 0x6f, 0x64, 0x12, 0x21, 0x0a, 0x0c, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x5f, 0x6e,
	0x61, 0x6d, 0x65, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x09, 0x52, 0x0b, 0x70, 0x6c, 0x61, 0x79,
	0x65, 0x72, 0x4e, 0x61, 0x6d, 0x65, 0x73, 0x12, 0x25, 0x0a, 0x0e, 0x70, 0x6c, 0x61, 0x79, 0x65,
	0x72, 0x5f, 0x63, 0x6c, 0x61, 0x73, 0x73, 0x65, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x05, 0x52,
	0x0d, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x43, 0x6c, 0x61, 0x73, 0x73, 0x65, 0x73, 0x12, 0x3f,
	0x0a, 0x11, 0x64, 0x69, 0x76, 0x69, 0x73, 0x69, 0x6f, 0x6e, 0x5f, 0x70, 0x61, 0x69, 0x72, 0x69,
	0x6e, 0x67, 0x73, 0x18, 0x04, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x69, 0x70, 0x63, 0x2e,
	0x52, 0x6f, 0x75, 0x6e, 0x64, 0x50, 0x61, 0x69, 0x72, 0x69, 0x6e, 0x67, 0x73, 0x52, 0x10, 0x64,
	0x69, 0x76, 0x69, 0x73, 0x69, 0x6f, 0x6e, 0x50, 0x61, 0x69, 0x72, 0x69, 0x6e, 0x67, 0x73, 0x12,
	0x3c, 0x0a, 0x10, 0x64, 0x69, 0x76, 0x69, 0x73, 0x69, 0x6f, 0x6e, 0x5f, 0x72, 0x65, 0x73, 0x75,
	0x6c, 0x74, 0x73, 0x18, 0x05, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x69, 0x70, 0x63, 0x2e,
	0x52, 0x6f, 0x75, 0x6e, 0x64, 0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x73, 0x52, 0x0f, 0x64, 0x69,
	0x76, 0x69, 0x73, 0x69, 0x6f, 0x6e, 0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x73, 0x12, 0x21, 0x0a,
	0x0c, 0x63, 0x6c, 0x61, 0x73, 0x73, 0x5f, 0x70, 0x72, 0x69, 0x7a, 0x65, 0x73, 0x18, 0x06, 0x20,
	0x03, 0x28, 0x05, 0x52, 0x0b, 0x63, 0x6c, 0x61, 0x73, 0x73, 0x50, 0x72, 0x69, 0x7a, 0x65, 0x73,
	0x12, 0x23, 0x0a, 0x0d, 0x67, 0x69, 0x62, 0x73, 0x6f, 0x6e, 0x5f, 0x73, 0x70, 0x72, 0x65, 0x61,
	0x64, 0x18, 0x07, 0x20, 0x01, 0x28, 0x05, 0x52, 0x0c, 0x67, 0x69, 0x62, 0x73, 0x6f, 0x6e, 0x53,
	0x70, 0x72, 0x65, 0x61, 0x64, 0x12, 0x34, 0x0a, 0x16, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c,
	0x5f, 0x6c, 0x6f, 0x73, 0x73, 0x5f, 0x74, 0x68, 0x72, 0x65, 0x73, 0x68, 0x6f, 0x6c, 0x64, 0x18,
	0x08, 0x20, 0x01, 0x28, 0x01, 0x52, 0x14, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x4c, 0x6f,
	0x73, 0x73, 0x54, 0x68, 0x72, 0x65, 0x73, 0x68, 0x6f, 0x6c, 0x64, 0x12, 0x33, 0x0a, 0x15, 0x68,
	0x6f, 0x70, 0x65, 0x66, 0x75, 0x6c, 0x6e, 0x65, 0x73, 0x73, 0x5f, 0x74, 0x68, 0x72, 0x65, 0x73,
	0x68, 0x6f, 0x6c, 0x64, 0x18, 0x09, 0x20, 0x01, 0x28, 0x01, 0x52, 0x14, 0x68, 0x6f, 0x70, 0x65,
	0x66, 0x75, 0x6c, 0x6e, 0x65, 0x73, 0x73, 0x54, 0x68, 0x72, 0x65, 0x73, 0x68, 0x6f, 0x6c, 0x64,
	0x12, 0x1f, 0x0a, 0x0b, 0x61, 0x6c, 0x6c, 0x5f, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x73, 0x18,
	0x0a, 0x20, 0x01, 0x28, 0x05, 0x52, 0x0a, 0x61, 0x6c, 0x6c, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72,
	0x73, 0x12, 0x23, 0x0a, 0x0d, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x5f, 0x70, 0x6c, 0x61, 0x79, 0x65,
	0x72, 0x73, 0x18, 0x0b, 0x20, 0x01, 0x28, 0x05, 0x52, 0x0c, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x50,
	0x6c, 0x61, 0x79, 0x65, 0x72, 0x73, 0x12, 0x16, 0x0a, 0x06, 0x72, 0x6f, 0x75, 0x6e, 0x64, 0x73,
	0x18, 0x0c, 0x20, 0x01, 0x28, 0x05, 0x52, 0x06, 0x72, 0x6f, 0x75, 0x6e, 0x64, 0x73, 0x12, 0x21,
	0x0a, 0x0c, 0x70, 0x6c, 0x61, 0x63, 0x65, 0x5f, 0x70, 0x72, 0x69, 0x7a, 0x65, 0x73, 0x18, 0x0d,
	0x20, 0x01, 0x28, 0x05, 0x52, 0x0b, 0x70, 0x6c, 0x61, 0x63, 0x65, 0x50, 0x72, 0x69, 0x7a, 0x65,
	0x73, 0x12, 0x23, 0x0a, 0x0d, 0x64, 0x69, 0x76, 0x69, 0x73, 0x69, 0x6f, 0x6e, 0x5f, 0x73, 0x69,
	0x6d, 0x73, 0x18, 0x0e, 0x20, 0x01, 0x28, 0x05, 0x52, 0x0c, 0x64, 0x69, 0x76, 0x69, 0x73, 0x69,
	0x6f, 0x6e, 0x53, 0x69, 0x6d, 0x73, 0x12, 0x2a, 0x0a, 0x11, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f,
	0x6c, 0x5f, 0x6c, 0x6f, 0x73, 0x73, 0x5f, 0x73, 0x69, 0x6d, 0x73, 0x18, 0x0f, 0x20, 0x01, 0x28,
	0x05, 0x52, 0x0f, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x4c, 0x6f, 0x73, 0x73, 0x53, 0x69,
	0x6d, 0x73, 0x12, 0x28, 0x0a, 0x10, 0x75, 0x73, 0x65, 0x5f, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f,
	0x6c, 0x5f, 0x6c, 0x6f, 0x73, 0x73, 0x18, 0x10, 0x20, 0x01, 0x28, 0x08, 0x52, 0x0e, 0x75, 0x73,
	0x65, 0x43, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x4c, 0x6f, 0x73, 0x73, 0x12, 0x2a, 0x0a, 0x11,
	0x61, 0x6c, 0x6c, 0x6f, 0x77, 0x5f, 0x72, 0x65, 0x70, 0x65, 0x61, 0x74, 0x5f, 0x62, 0x79, 0x65,
	0x73, 0x18, 0x11, 0x20, 0x01, 0x28, 0x08, 0x52, 0x0f, 0x61, 0x6c, 0x6c, 0x6f, 0x77, 0x52, 0x65,
	0x70, 0x65, 0x61, 0x74, 0x42, 0x79, 0x65, 0x73, 0x12, 0x27, 0x0a, 0x0f, 0x72, 0x65, 0x6d, 0x6f,
	0x76, 0x65, 0x64, 0x5f, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x73, 0x18, 0x12, 0x20, 0x03, 0x28,
	0x05, 0x52, 0x0e, 0x72, 0x65, 0x6d, 0x6f, 0x76, 0x65, 0x64, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72,
	0x73, 0x12, 0x12, 0x0a, 0x04, 0x73, 0x65, 0x65, 0x64, 0x18, 0x13, 0x20, 0x01, 0x28, 0x03, 0x52,
	0x04, 0x73, 0x65, 0x65, 0x64, 0x22, 0x90, 0x01, 0x0a, 0x0c, 0x50, 0x61, 0x69, 0x72, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x2d, 0x0a, 0x0a, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x5f,
	0x63, 0x6f, 0x64, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x0e, 0x2e, 0x69, 0x70, 0x63,
	0x2e, 0x50, 0x61, 0x69, 0x72, 0x45, 0x72, 0x72, 0x6f, 0x72, 0x52, 0x09, 0x65, 0x72, 0x72, 0x6f,
	0x72, 0x43, 0x6f, 0x64, 0x65, 0x12, 0x23, 0x0a, 0x0d, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x5f, 0x6d,
	0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0c, 0x65, 0x72,
	0x72, 0x6f, 0x72, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x10, 0x0a, 0x03, 0x6c, 0x6f,
	0x67, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6c, 0x6f, 0x67, 0x12, 0x1a, 0x0a, 0x08,
	0x70, 0x61, 0x69, 0x72, 0x69, 0x6e, 0x67, 0x73, 0x18, 0x04, 0x20, 0x03, 0x28, 0x05, 0x52, 0x08,
	0x70, 0x61, 0x69, 0x72, 0x69, 0x6e, 0x67, 0x73, 0x2a, 0x15, 0x0a, 0x0a, 0x50, 0x61, 0x69, 0x72,
	0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x12, 0x07, 0x0a, 0x03, 0x43, 0x4f, 0x50, 0x10, 0x00, 0x2a,
	0xe6, 0x06, 0x0a, 0x09, 0x50, 0x61, 0x69, 0x72, 0x45, 0x72, 0x72, 0x6f, 0x72, 0x12, 0x0b, 0x0a,
	0x07, 0x53, 0x55, 0x43, 0x43, 0x45, 0x53, 0x53, 0x10, 0x00, 0x12, 0x1d, 0x0a, 0x19, 0x50, 0x4c,
	0x41, 0x59, 0x45, 0x52, 0x5f, 0x43, 0x4f, 0x55, 0x4e, 0x54, 0x5f, 0x49, 0x4e, 0x53, 0x55, 0x46,
	0x46, 0x49, 0x43, 0x49, 0x45, 0x4e, 0x54, 0x10, 0x01, 0x12, 0x1c, 0x0a, 0x18, 0x52, 0x4f, 0x55,
	0x4e, 0x44, 0x5f, 0x43, 0x4f, 0x55, 0x4e, 0x54, 0x5f, 0x49, 0x4e, 0x53, 0x55, 0x46, 0x46, 0x49,
	0x43, 0x49, 0x45, 0x4e, 0x54, 0x10, 0x02, 0x12, 0x1a, 0x0a, 0x16, 0x50, 0x4c, 0x41, 0x59, 0x45,
	0x52, 0x5f, 0x43, 0x4f, 0x55, 0x4e, 0x54, 0x5f, 0x54, 0x4f, 0x4f, 0x5f, 0x4c, 0x41, 0x52, 0x47,
	0x45, 0x10, 0x03, 0x12, 0x22, 0x0a, 0x1e, 0x50, 0x4c, 0x41, 0x59, 0x45, 0x52, 0x5f, 0x4e, 0x41,
	0x4d, 0x45, 0x5f, 0x43, 0x4f, 0x55, 0x4e, 0x54, 0x5f, 0x49, 0x4e, 0x53, 0x55, 0x46, 0x46, 0x49,
	0x43, 0x49, 0x45, 0x4e, 0x54, 0x10, 0x04, 0x12, 0x15, 0x0a, 0x11, 0x50, 0x4c, 0x41, 0x59, 0x45,
	0x52, 0x5f, 0x4e, 0x41, 0x4d, 0x45, 0x5f, 0x45, 0x4d, 0x50, 0x54, 0x59, 0x10, 0x05, 0x12, 0x1d,
	0x0a, 0x19, 0x4d, 0x4f, 0x52, 0x45, 0x5f, 0x50, 0x41, 0x49, 0x52, 0x49, 0x4e, 0x47, 0x53, 0x5f,
	0x54, 0x48, 0x41, 0x4e, 0x5f, 0x52, 0x4f, 0x55, 0x4e, 0x44, 0x53, 0x10, 0x06, 0x12, 0x15, 0x0a,
	0x11, 0x41, 0x4c, 0x4c, 0x5f, 0x52, 0x4f, 0x55, 0x4e, 0x44, 0x53, 0x5f, 0x50, 0x41, 0x49, 0x52,
	0x45, 0x44, 0x10, 0x07, 0x12, 0x20, 0x0a, 0x1c, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f,
	0x52, 0x4f, 0x55, 0x4e, 0x44, 0x5f, 0x50, 0x41, 0x49, 0x52, 0x49, 0x4e, 0x47, 0x53, 0x5f, 0x43,
	0x4f, 0x55, 0x4e, 0x54, 0x10, 0x08, 0x12, 0x1e, 0x0a, 0x1a, 0x50, 0x4c, 0x41, 0x59, 0x45, 0x52,
	0x5f, 0x49, 0x4e, 0x44, 0x45, 0x58, 0x5f, 0x4f, 0x55, 0x54, 0x5f, 0x4f, 0x46, 0x5f, 0x42, 0x4f,
	0x55, 0x4e, 0x44, 0x53, 0x10, 0x09, 0x12, 0x13, 0x0a, 0x0f, 0x55, 0x4e, 0x50, 0x41, 0x49, 0x52,
	0x45, 0x44, 0x5f, 0x50, 0x4c, 0x41, 0x59, 0x45, 0x52, 0x10, 0x0a, 0x12, 0x13, 0x0a, 0x0f, 0x49,
	0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f, 0x50, 0x41, 0x49, 0x52, 0x49, 0x4e, 0x47, 0x10, 0x0b,
	0x12, 0x1c, 0x0a, 0x18, 0x4d, 0x4f, 0x52, 0x45, 0x5f, 0x52, 0x45, 0x53, 0x55, 0x4c, 0x54, 0x53,
	0x5f, 0x54, 0x48, 0x41, 0x4e, 0x5f, 0x52, 0x4f, 0x55, 0x4e, 0x44, 0x53, 0x10, 0x0c, 0x12, 0x1e,
	0x0a, 0x1a, 0x4d, 0x4f, 0x52, 0x45, 0x5f, 0x52, 0x45, 0x53, 0x55, 0x4c, 0x54, 0x53, 0x5f, 0x54,
	0x48, 0x41, 0x4e, 0x5f, 0x50, 0x41, 0x49, 0x52, 0x49, 0x4e, 0x47, 0x53, 0x10, 0x0d, 0x12, 0x1f,
	0x0a, 0x1b, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f, 0x52, 0x4f, 0x55, 0x4e, 0x44, 0x5f,
	0x52, 0x45, 0x53, 0x55, 0x4c, 0x54, 0x53, 0x5f, 0x43, 0x4f, 0x55, 0x4e, 0x54, 0x10, 0x0e, 0x12,
	0x1e, 0x0a, 0x1a, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f, 0x50, 0x4c, 0x41, 0x59, 0x45,
	0x52, 0x5f, 0x43, 0x4c, 0x41, 0x53, 0x53, 0x5f, 0x43, 0x4f, 0x55, 0x4e, 0x54, 0x10, 0x0f, 0x12,
	0x18, 0x0a, 0x14, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f, 0x50, 0x4c, 0x41, 0x59, 0x45,
	0x52, 0x5f, 0x43, 0x4c, 0x41, 0x53, 0x53, 0x10, 0x10, 0x12, 0x17, 0x0a, 0x13, 0x49, 0x4e, 0x56,
	0x41, 0x4c, 0x49, 0x44, 0x5f, 0x43, 0x4c, 0x41, 0x53, 0x53, 0x5f, 0x50, 0x52, 0x49, 0x5a, 0x45,
	0x10, 0x11, 0x12, 0x19, 0x0a, 0x15, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f, 0x47, 0x49,
	0x42, 0x53, 0x4f, 0x4e, 0x5f, 0x53, 0x50, 0x52, 0x45, 0x41, 0x44, 0x10, 0x12, 0x12, 0x22, 0x0a,
	0x1e, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f, 0x43, 0x4f, 0x4e, 0x54, 0x52, 0x4f, 0x4c,
	0x5f, 0x4c, 0x4f, 0x53, 0x53, 0x5f, 0x54, 0x48, 0x52, 0x45, 0x53, 0x48, 0x4f, 0x4c, 0x44, 0x10,
	0x13, 0x12, 0x21, 0x0a, 0x1d, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f, 0x48, 0x4f, 0x50,
	0x45, 0x46, 0x55, 0x4c, 0x4e, 0x45, 0x53, 0x53, 0x5f, 0x54, 0x48, 0x52, 0x45, 0x53, 0x48, 0x4f,
	0x4c, 0x44, 0x10, 0x14, 0x12, 0x19, 0x0a, 0x15, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f,
	0x44, 0x49, 0x56, 0x49, 0x53, 0x49, 0x4f, 0x4e, 0x5f, 0x53, 0x49, 0x4d, 0x53, 0x10, 0x15, 0x12,
	0x1d, 0x0a, 0x19, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f, 0x43, 0x4f, 0x4e, 0x54, 0x52,
	0x4f, 0x4c, 0x5f, 0x4c, 0x4f, 0x53, 0x53, 0x5f, 0x53, 0x49, 0x4d, 0x53, 0x10, 0x16, 0x12, 0x18,
	0x0a, 0x14, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f, 0x50, 0x4c, 0x41, 0x43, 0x45, 0x5f,
	0x50, 0x52, 0x49, 0x5a, 0x45, 0x53, 0x10, 0x17, 0x12, 0x1a, 0x0a, 0x16, 0x49, 0x4e, 0x56, 0x41,
	0x4c, 0x49, 0x44, 0x5f, 0x52, 0x45, 0x4d, 0x4f, 0x56, 0x45, 0x44, 0x5f, 0x50, 0x4c, 0x41, 0x59,
	0x45, 0x52, 0x10, 0x18, 0x12, 0x1e, 0x0a, 0x1a, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f,
	0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f, 0x50, 0x4c, 0x41, 0x59, 0x45, 0x52, 0x5f, 0x43, 0x4f, 0x55,
	0x4e, 0x54, 0x10, 0x19, 0x12, 0x17, 0x0a, 0x13, 0x4d, 0x49, 0x4e, 0x5f, 0x57, 0x45, 0x49, 0x47,
	0x48, 0x54, 0x5f, 0x4d, 0x41, 0x54, 0x43, 0x48, 0x49, 0x4e, 0x47, 0x10, 0x1a, 0x12, 0x1b, 0x0a,
	0x17, 0x49, 0x4e, 0x56, 0x41, 0x4c, 0x49, 0x44, 0x5f, 0x50, 0x41, 0x49, 0x52, 0x49, 0x4e, 0x47,
	0x53, 0x5f, 0x4c, 0x45, 0x4e, 0x47, 0x54, 0x48, 0x10, 0x1b, 0x12, 0x13, 0x0a, 0x0f, 0x4f, 0x56,
	0x45, 0x52, 0x43, 0x4f, 0x4e, 0x53, 0x54, 0x52, 0x41, 0x49, 0x4e, 0x45, 0x44, 0x10, 0x1c, 0x12,
	0x1a, 0x0a, 0x16, 0x52, 0x45, 0x51, 0x55, 0x45, 0x53, 0x54, 0x5f, 0x54, 0x4f, 0x5f, 0x4a, 0x53,
	0x4f, 0x4e, 0x5f, 0x46, 0x41, 0x49, 0x4c, 0x45, 0x44, 0x10, 0x1d, 0x12, 0x0b, 0x0a, 0x07, 0x54,
	0x49, 0x4d, 0x45, 0x4f, 0x55, 0x54, 0x10, 0x1e, 0x42, 0x71, 0x0a, 0x07, 0x63, 0x6f, 0x6d, 0x2e,
	0x69, 0x70, 0x63, 0x42, 0x09, 0x50, 0x61, 0x69, 0x72, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01,
	0x5a, 0x2f, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x77, 0x6f, 0x6f,
	0x67, 0x6c, 0x65, 0x73, 0x2d, 0x69, 0x6f, 0x2f, 0x6c, 0x69, 0x77, 0x6f, 0x72, 0x64, 0x73, 0x2f,
	0x72, 0x70, 0x63, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x70,
	0x63, 0xa2, 0x02, 0x03, 0x49, 0x58, 0x58, 0xaa, 0x02, 0x03, 0x49, 0x70, 0x63, 0xca, 0x02, 0x03,
	0x49, 0x70, 0x63, 0xe2, 0x02, 0x0f, 0x49, 0x70, 0x63, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74,
	0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x03, 0x49, 0x70, 0x63, 0x62, 0x06, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x33,
}

var (
	file_proto_ipc_pair_proto_rawDescOnce sync.Once
	file_proto_ipc_pair_proto_rawDescData = file_proto_ipc_pair_proto_rawDesc
)

func file_proto_ipc_pair_proto_rawDescGZIP() []byte {
	file_proto_ipc_pair_proto_rawDescOnce.Do(func() {
		file_proto_ipc_pair_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_ipc_pair_proto_rawDescData)
	})
	return file_proto_ipc_pair_proto_rawDescData
}

var file_proto_ipc_pair_proto_enumTypes = make([]protoimpl.EnumInfo, 2)
var file_proto_ipc_pair_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_proto_ipc_pair_proto_goTypes = []interface{}{
	(PairMethod)(0),       // 0: ipc.PairMethod
	(PairError)(0),        // 1: ipc.PairError
	(*RoundPairings)(nil), // 2: ipc.RoundPairings
	(*RoundResults)(nil),  // 3: ipc.RoundResults
	(*PairRequest)(nil),   // 4: ipc.PairRequest
	(*PairResponse)(nil),  // 5: ipc.PairResponse
}
var file_proto_ipc_pair_proto_depIdxs = []int32{
	0, // 0: ipc.PairRequest.pair_method:type_name -> ipc.PairMethod
	2, // 1: ipc.PairRequest.division_pairings:type_name -> ipc.RoundPairings
	3, // 2: ipc.PairRequest.division_results:type_name -> ipc.RoundResults
	1, // 3: ipc.PairResponse.error_code:type_name -> ipc.PairError
	4, // [4:4] is the sub-list for method output_type
	4, // [4:4] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_proto_ipc_pair_proto_init() }
func file_proto_ipc_pair_proto_init() {
	if File_proto_ipc_pair_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_proto_ipc_pair_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RoundPairings); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_ipc_pair_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RoundResults); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_ipc_pair_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PairRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_ipc_pair_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PairResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proto_ipc_pair_proto_rawDesc,
			NumEnums:      2,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_proto_ipc_pair_proto_goTypes,
		DependencyIndexes: file_proto_ipc_pair_proto_depIdxs,
		EnumInfos:         file_proto_ipc_pair_proto_enumTypes,
		MessageInfos:      file_proto_ipc_pair_proto_msgTypes,
	}.Build()
	File_proto_ipc_pair_proto = out.File
	file_proto_ipc_pair_proto_rawDesc = nil
	file_proto_ipc_pair_proto_goTypes = nil
	file_proto_ipc_pair_proto_depIdxs = nil
}