//
//  RecorderManager.m
//  screenrecord
//
//  Created by Chenshu on 30/5/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RecorderManager.h"
#import <React/RCTLog.h>
#import "ASScreenRecorder.h"
#import "AppDelegate.h"
@implementation RecorderManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(start)
{
  RCTLogInfo(@"started!");
  ASScreenRecorder *recorder = [ASScreenRecorder sharedInstance];
  
  if (!recorder.isRecording) {
    [recorder startRecording];
    RCTLogInfo(@"Start recording");
  }
}

RCT_EXPORT_METHOD(stop)
{
  RCTLogInfo(@"started!");
  ASScreenRecorder *recorder = [ASScreenRecorder sharedInstance];
  
  if (recorder.isRecording) {
    [recorder stopRecordingWithCompletion:^{
      RCTLogInfo(@"Finished recording");
    }];
  }
}
@end

